import type { PlaygroundMessages } from '../../i18n/playground';
import type { RequestPhase, RequestState } from '../../labs/requestMachine';

export const requestStages = ['intent', 'projection', 'response', 'reconciliation'] as const;
export type RequestStage = (typeof requestStages)[number];
const activeStages: Record<RequestPhase, RequestStage> = {
  draft: 'intent',
  pending: 'projection',
  'b-confirmed': 'response',
  accepted: 'reconciliation',
  reloaded: 'reconciliation',
  invalid: 'reconciliation',
  conflict: 'reconciliation',
  offline: 'reconciliation',
  'stale-ignored': 'reconciliation',
};

/** Presentation derived from the reducer, never another independently mutable state. */
export function requestView(state: RequestState, t: PlaygroundMessages) {
  const pending = state.phase === 'pending';
  const race = state.scenario === 'race' && state.phase !== 'draft';
  const provisional = pending || state.phase === 'conflict' || state.phase === 'offline';
  let responseLabel = t.deliver;
  if (state.phase === 'b-confirmed') responseLabel = t.deliverA;
  else if (state.scenario === 'race') responseLabel = t.deliverB;

  const confirmed = { priority: state.confirmed, revision: state.revision };
  const confirmedDocument =
    race && (state.phase === 'b-confirmed' || state.phase === 'stale-ignored')
      ? { title: t.raceTitle, ...confirmed }
      : confirmed;
  return {
    phaseText: t.requestPhases[state.phase],
    title: race ? t.raceTitle : t.documentTitle,
    priority: state.priority === 'high' ? t.high : t.normal,
    canEdit: state.phase === 'draft',
    canSave: state.phase === 'draft' && state.dirty,
    canDeliver: pending || state.phase === 'b-confirmed',
    provisional,
    activeStage: activeStages[state.phase],
    raceIntent: race ? t.raceIntent : t.traceDetails.projection,
    responseLabel,
    confirmedJson: JSON.stringify(confirmedDocument, null, 2),
  };
}
export type RequestView = ReturnType<typeof requestView>;
