import assert from 'node:assert/strict';
import { test } from 'node:test';

import type { AgentState } from '../src/labs/agentMachine.ts';
import {
  agentReducer,
  agentScenarios,
  canAcceptAgent,
  initialAgents,
} from '../src/labs/agentMachine.ts';
import type { RequestState } from '../src/labs/requestMachine.ts';
import { initialRequest, requestReducer, requestScenarios } from '../src/labs/requestMachine.ts';

const requestActions = ['edit', 'send', 'deliver', 'reload', 'reapply', 'retry'] as const;

function reachableRequests() {
  const states: RequestState[] = [];
  const visited = new Set<string>();
  const queue: RequestState[] = requestScenarios.map(initialRequest);
  while (queue.length) {
    const state = queue.shift();
    if (!state) break;
    const key = JSON.stringify(state);
    if (visited.has(key)) continue;
    visited.add(key);
    assert.ok(visited.size < 300, 'request graph must remain bounded');
    states.push(state);
    Object.freeze(state);
    for (const type of requestActions) queue.push(requestReducer(state, { type }));
  }
  return states;
}

const requests = reachableRequests();

test('every reachable request state resets completely when changing any scenario', () => {
  for (const state of requests) {
    for (const scenario of requestScenarios) {
      assert.deepEqual(
        requestReducer(state, { type: 'scenario', scenario }),
        initialRequest(scenario),
      );
    }
    assert.deepEqual(requestReducer(state, { type: 'reset' }), initialRequest(state.scenario));
  }
});

test('out-of-context request actions never fabricate a confirmation or mutate state', () => {
  const allowed: Record<(typeof requestActions)[number], (state: RequestState) => boolean> = {
    edit: (state) => state.phase === 'draft',
    send: (state) => state.phase === 'draft' && state.dirty,
    deliver: (state) => state.phase === 'pending' || state.phase === 'b-confirmed',
    reload: (state) => state.phase === 'conflict',
    reapply: (state) => state.phase === 'conflict',
    retry: (state) => state.phase === 'offline',
  };
  for (const state of requests) {
    for (const type of requestActions) {
      if (!allowed[type](state)) assert.equal(requestReducer(state, { type }), state);
    }
    if (['accepted', 'reloaded', 'invalid', 'b-confirmed', 'stale-ignored'].includes(state.phase)) {
      assert.equal(state.dirty, false);
    }
    assert.equal('attempt' in state, state.phase === 'pending');
  }
});

function readyAgent(scenario: (typeof agentScenarios)[number]): AgentState {
  let state = initialAgents(scenario);
  for (let step = 0; step < 4; step++) state = agentReducer(state, { type: 'next' });
  return state;
}

test('agent scenario changes clear exploration, diagnosis, revision and consent', () => {
  const dirtyStates: AgentState[] = [];
  for (const scenario of agentScenarios) {
    let state = readyAgent(scenario);
    state = agentReducer(state, { type: 'check', key: 'criteria', value: true });
    state = agentReducer(state, { type: 'check', key: 'evidence', value: true });
    dirtyStates.push(
      state,
      agentReducer(state, { type: 'accept' }),
      agentReducer(state, { type: 'revise' }),
    );
  }
  for (const state of dirtyStates) {
    for (const scenario of agentScenarios)
      assert.deepEqual(
        agentReducer(state, { type: 'scenario', scenario }),
        initialAgents(scenario),
      );
    assert.deepEqual(agentReducer(state, { type: 'reset' }), initialAgents(state.scenario));
  }
});

test('diagnosis and consent cannot be injected outside their contextual steps', () => {
  const initial = initialAgents('regression');
  assert.equal(agentReducer(initial, { type: 'diagnose' }), initial);
  assert.equal(agentReducer(initial, { type: 'return' }), initial);
  assert.equal(agentReducer(initial, { type: 'check', key: 'criteria', value: true }), initial);
  assert.equal(agentReducer(initial, { type: 'revise' }), initial);
  let state = agentReducer(initial, { type: 'select', role: 'tester' });
  state = agentReducer(state, { type: 'diagnose' });
  assert.equal(state.selected, 'debugger');
  state = agentReducer(state, { type: 'return' });
  assert.equal(state.corrected, true);
  assert.equal(state.selected, 'developer');
});

test('navigation remains bounded and support roles do not advance the main workflow', () => {
  const initial = initialAgents();
  assert.equal(agentReducer(initial, { type: 'back' }).position, 0);
  const final = readyAgent('endpoint');
  assert.equal(agentReducer(final, { type: 'next' }).position, 4);
  for (const role of ['orchestrator', 'debugger', 'documentation'] as const) {
    const selected = agentReducer(initial, { type: 'select', role });
    assert.equal(selected.position, 0);
    assert.equal(canAcceptAgent(selected), false);
  }
});

test('accepted human consent cannot be silently revoked or revised', () => {
  let state = readyAgent('endpoint');
  state = agentReducer(state, { type: 'check', key: 'criteria', value: true });
  state = agentReducer(state, { type: 'check', key: 'evidence', value: true });
  state = agentReducer(state, { type: 'accept' });
  assert.equal(state.accepted, true);
  assert.equal(agentReducer(state, { type: 'check', key: 'criteria', value: false }), state);
  assert.equal(agentReducer(state, { type: 'revise' }), state);
});

// Compile-time contract: a pending request cannot be declared clean.
// @ts-expect-error pending requests retain an unresolved local modification
const invalidPending: RequestState = {
  ...initialRequest(),
  phase: 'pending',
  attempt: 'initial',
  dirty: false,
};
void invalidPending;
