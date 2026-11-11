import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  connectionView,
  decisionConsequences,
} from '../src/features/engineering-decisions/presentation.ts';
import { requestView } from '../src/features/request-playground/presentation.ts';
import { decisionsMessages } from '../src/i18n/decisions.ts';
import { playgroundMessages } from '../src/i18n/playground.ts';
import { architectureModel } from '../src/labs/architecture.ts';
import { initialRequest, requestReducer } from '../src/labs/requestMachine.ts';

for (const locale of ['fr', 'en'] as const) {
  test(`${locale}: queue recovery and contract migration are distinct explanations`, () => {
    const t = decisionsMessages[locale];
    const crash = architectureModel('services', 'crash', true);
    assert.equal(connectionView(true, crash, 'crash', t).label, t.queuedEvent);
    const contract = architectureModel('services', 'contract', false);
    assert.equal(connectionView(true, contract, 'contract', t).label, t.changingContract);
    assert.equal(decisionConsequences(crash, t)[0].text, t.consequences.queueRecovery);
    assert.equal(decisionConsequences(contract, t)[0].text, t.consequences.networkDependencies);
  });
  test(`${locale}: the displayed projection never changes confirmed data before delivery`, () => {
    const t = playgroundMessages[locale];
    const edited = requestReducer(initialRequest(), { type: 'edit' });
    const pending = requestReducer(edited, { type: 'send' });
    const view = requestView(pending, t);
    assert.equal(view.provisional, true);
    assert.equal(view.canSave, false);
    assert.equal(JSON.parse(view.confirmedJson).priority, 'normal');
    const accepted = requestView(requestReducer(pending, { type: 'deliver' }), t);
    assert.equal(accepted.provisional, false);
    assert.equal(accepted.canDeliver, false);
    assert.equal(JSON.parse(accepted.confirmedJson).priority, 'high');
  });
  test(`${locale}: discarding a projection is not described as accepting a write`, () => {
    const t = playgroundMessages[locale];
    let state = requestReducer(initialRequest('conflict'), { type: 'edit' });
    state = requestReducer(state, { type: 'send' });
    state = requestReducer(state, { type: 'deliver' });
    const view = requestView(requestReducer(state, { type: 'reload' }), t);
    assert.equal(view.phaseText, t.requestPhases.reloaded);
    assert.equal(JSON.parse(view.confirmedJson).revision, 8);
    assert.equal(JSON.parse(view.confirmedJson).priority, 'normal');
  });
}
