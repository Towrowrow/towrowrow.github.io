import assert from 'node:assert/strict';
import { test } from 'node:test';

import { agentArtifact } from '../src/features/ai-engineering-lab/artifacts.ts';
import type { AgentState } from '../src/labs/agentMachine.ts';
import { agentReducer, canAcceptAgent, initialAgents } from '../src/labs/agentMachine.ts';
import { architectureModel } from '../src/labs/architecture.ts';
import type { RequestScenario, RequestState } from '../src/labs/requestMachine.ts';
import { initialRequest, requestReducer } from '../src/labs/requestMachine.ts';

test('a fatal process stop affects the monolith, including when the async checkbox was previously selected', () => {
  const result = architectureModel('modular', 'crash', true);
  assert.deepEqual(Object.values(result.statuses), ['stopped', 'stopped', 'stopped']);
  assert.equal(result.queued, false);
});
test('separate processes do not imply a successful synchronous journey', () => {
  assert.deepEqual(Object.values(architectureModel('services', 'crash', false).statuses), [
    'waiting',
    'waiting',
    'stopped',
  ]);
  const queued = architectureModel('services', 'crash', true);
  assert.deepEqual(Object.values(queued.statuses), ['available', 'available', 'stopped']);
  assert.equal(queued.outcome, 'queuedCrash');
});
test('contract evolution is distinguished from process failure', () => {
  assert.deepEqual(Object.values(architectureModel('services', 'contract', false).statuses), [
    'available',
    'available',
    'changing',
  ]);
});
function send(scenario: RequestScenario): RequestState {
  return requestReducer(requestReducer(initialRequest(scenario), { type: 'edit' }), {
    type: 'send',
  });
}
test('a save requires a change and repeated delivery cannot apply a write twice', () => {
  assert.equal(requestReducer(initialRequest(), { type: 'send' }).phase, 'draft');
  const saved = requestReducer(send('success'), { type: 'deliver' });
  assert.equal(saved.revision, 8);
  assert.equal(requestReducer(saved, { type: 'deliver' }).revision, 8);
});
test('contract rejection restores the last confirmed value', () => {
  const rejected = requestReducer(send('validation'), { type: 'deliver' });
  assert.equal(rejected.phase, 'invalid');
  assert.equal(rejected.priority, 'normal');
  assert.equal(rejected.revision, 7);
});
test('conflict resolution can abandon a projection or reapply it as a new intent', () => {
  const conflict = requestReducer(send('conflict'), { type: 'deliver' });
  assert.equal(conflict.revision, 8);
  assert.equal(conflict.priority, 'high');
  assert.equal(conflict.confirmed, 'normal');
  const reloaded = requestReducer(conflict, { type: 'reload' });
  assert.equal(reloaded.priority, 'normal');
  assert.equal(reloaded.phase, 'reloaded');
  assert.equal(reloaded.revision, 8);
  const reapplied = requestReducer(conflict, { type: 'reapply' });
  assert.equal(reapplied.phase, 'pending');
  assert.equal(reapplied.intent, 2);
  const confirmed = requestReducer(reapplied, { type: 'deliver' });
  assert.equal(confirmed.revision, 9);
  assert.equal(confirmed.confirmed, 'high');
});
test('a transport retry preserves intent and only confirms one write', () => {
  const offline = requestReducer(send('offline'), { type: 'deliver' });
  assert.equal(offline.phase, 'offline');
  assert.equal(offline.revision, 7);
  const retry = requestReducer(offline, { type: 'retry' });
  assert.equal(retry.intent, offline.intent);
  const confirmed = requestReducer(retry, { type: 'deliver' });
  assert.equal(confirmed.revision, 8);
  assert.equal(confirmed.phase, 'accepted');
});
test('an older response cannot overwrite the confirmed newer intent', () => {
  const b = requestReducer(send('race'), { type: 'deliver' });
  assert.equal(b.phase, 'b-confirmed');
  assert.equal(b.revision, 9);
  const a = requestReducer(b, { type: 'deliver' });
  assert.equal(a.phase, 'stale-ignored');
  assert.equal(a.revision, 9);
  assert.equal(a.confirmed, 'high');
  assert.equal(a.intent, 2);
});
function ready(scenario: 'endpoint' | 'regression' = 'endpoint'): AgentState {
  let s = initialAgents(scenario);
  for (let i = 0; i < 4; i++) s = agentReducer(s, { type: 'next' });
  s = agentReducer(s, { type: 'check', key: 'criteria', value: true });
  return agentReducer(s, { type: 'check', key: 'evidence', value: true });
}
test('human approval requires all main roles and both explicit checks', () => {
  let skipped = agentReducer(initialAgents(), { type: 'select', role: 'reviewer' });
  skipped = agentReducer(skipped, { type: 'next' });
  skipped = agentReducer(skipped, { type: 'check', key: 'criteria', value: true });
  skipped = agentReducer(skipped, { type: 'check', key: 'evidence', value: true });
  assert.equal(canAcceptAgent(skipped), false);
  assert.equal(agentReducer(skipped, { type: 'accept' }).accepted, false);
  const s = ready();
  assert.equal(canAcceptAgent(s), true);
  assert.equal(agentReducer(s, { type: 'accept' }).accepted, true);
});
test('a regression cannot be approved until the diagnosis and correction loop is explored', () => {
  let s = ready('regression');
  assert.equal(canAcceptAgent(s), false);
  s = agentReducer(s, { type: 'select', role: 'tester' });
  s = agentReducer(s, { type: 'diagnose' });
  s = agentReducer(s, { type: 'return' });
  for (let i = 0; i < 3; i++) s = agentReducer(s, { type: 'next' });
  assert.equal(canAcceptAgent(s), true);
});
test('requesting revision clears consent and scenario changes reset the entire workflow', () => {
  const revised = agentReducer(ready(), { type: 'revise' });
  assert.equal(revised.position, 1);
  assert.equal(revised.criteria, false);
  assert.equal(revised.evidence, false);
  assert.equal(canAcceptAgent(revised), false);
  assert.deepEqual(
    agentReducer(revised, { type: 'scenario', scenario: 'refactor' }),
    initialAgents('refactor'),
  );
});

test('React refactoring artifacts preserve UI contracts instead of describing endpoint creation', () => {
  for (const locale of ['fr', 'en'] as const) {
    for (const role of ['developer', 'tester', 'reviewer', 'debugger'] as const) {
      const artifact = agentArtifact(locale, { ...initialAgents('refactor'), selected: role });
      assert.ok(!JSON.stringify(artifact).includes('422'));
      assert.ok(!artifact.items.some((item) => item.includes('→ cr')));
    }
    const artifact = agentArtifact(locale, { ...initialAgents('refactor'), selected: 'developer' });
    assert.ok(artifact.code?.includes('useReducer'));
  }
});
