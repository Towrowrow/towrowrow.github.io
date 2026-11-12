import assert from 'node:assert/strict';
import { test } from 'node:test';

import { agentLesson, humanLesson } from '../src/features/ai-engineering-lab/lesson.ts';
import { requestLesson } from '../src/features/request-playground/lesson.ts';
import { labStories } from '../src/i18n/labStories.ts';
import { agentReducer, canAcceptAgent, initialAgents } from '../src/labs/agentMachine.ts';
import { initialRequest, requestReducer } from '../src/labs/requestMachine.ts';

for (const locale of ['fr', 'en'] as const) {
  test(`${locale}: changing the priority explains the unsaved change before sending`, () => {
    const initial = initialRequest('conflict');
    const edited = requestReducer(initial, { type: 'edit' });
    const lesson = requestLesson(edited, locale);
    assert.notEqual(lesson.title, requestLesson(initial, locale).title);
    assert.equal(lesson.step, 1);
    assert.equal(lesson.complete, false);
    assert.equal(edited.confirmed, 'normal');
    const undone = requestReducer(edited, { type: 'edit' });
    assert.equal(requestLesson(undone, locale).step, 0);
  });

  test(`${locale}: a conflict needs a decision, while loading the other version completes the story`, () => {
    let state = requestReducer(initialRequest('conflict'), { type: 'edit' });
    state = requestReducer(state, { type: 'send' });
    state = requestReducer(state, { type: 'deliver' });
    assert.equal(requestLesson(state, locale).complete, false);
    assert.equal(state.priority, 'high');
    assert.equal(state.confirmed, 'normal');
    state = requestReducer(state, { type: 'reload' });
    assert.equal(requestLesson(state, locale).complete, true);
    assert.equal(
      requestLesson(state, locale).title,
      labStories[locale].playground.phases.reloaded.title,
    );
    assert.equal(state.priority, state.confirmed);
  });

  test(`${locale}: late-response guidance offers the older response only after the newer one`, () => {
    let state = requestReducer(initialRequest('race'), { type: 'edit' });
    state = requestReducer(state, { type: 'send' });
    const pending = requestLesson(state, locale);
    state = requestReducer(state, { type: 'deliver' });
    const newest = requestLesson(state, locale);
    assert.notEqual(pending.receive, newest.receive);
    assert.equal(newest.complete, false);
    const revision = state.revision;
    state = requestReducer(state, { type: 'deliver' });
    assert.equal(requestLesson(state, locale).complete, true);
    assert.equal(state.revision, revision);
  });

  test(`${locale}: a connection failure is never explained as a successful save`, () => {
    let state = requestReducer(initialRequest('offline'), { type: 'edit' });
    state = requestReducer(state, { type: 'send' });
    state = requestReducer(state, { type: 'deliver' });
    assert.equal(requestLesson(state, locale).complete, false);
    assert.equal(
      requestLesson(state, locale).title,
      labStories[locale].playground.phases.offline.title,
    );
    state = requestReducer(state, { type: 'retry' });
    assert.equal(requestLesson(state, locale).complete, false);
    state = requestReducer(state, { type: 'deliver' });
    assert.equal(requestLesson(state, locale).complete, true);
  });

  test(`${locale}: human guidance distinguishes skipped roles, unresolved failure and readiness`, () => {
    let state = agentReducer(initialAgents('regression'), { type: 'select', role: 'reviewer' });
    state = agentReducer(state, { type: 'next' });
    assert.equal(humanLesson(state, locale), labStories[locale].agents.humanMissing);
    state = agentReducer(state, { type: 'select', role: 'developer' });
    state = agentReducer(state, { type: 'select', role: 'tester' });
    const failed = agentLesson(state, locale);
    state = agentReducer(state, { type: 'select', role: 'human' });
    assert.equal(humanLesson(state, locale), labStories[locale].agents.humanUnresolved);
    assert.equal(canAcceptAgent(state), false);
    state = agentReducer(state, { type: 'select', role: 'tester' });
    state = agentReducer(state, { type: 'diagnose' });
    state = agentReducer(state, { type: 'return' });
    state = agentReducer(state, { type: 'select', role: 'tester' });
    assert.notEqual(agentLesson(state, locale).title, failed.title);
    state = agentReducer(state, { type: 'select', role: 'human' });
    assert.equal(humanLesson(state, locale), labStories[locale].agents.humanReady);
    assert.equal(canAcceptAgent(state), false, 'explicit human confirmation still required');
  });
}
