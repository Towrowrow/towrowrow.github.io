export const requestScenarios = ['success', 'validation', 'conflict', 'offline', 'race'] as const;
export type RequestScenario = (typeof requestScenarios)[number];
export type Priority = 'normal' | 'high';

export const INITIAL_REVISION = 7;
const CONFLICT_REVISION = INITIAL_REVISION + 1;
const LATEST_RACE_REVISION = INITIAL_REVISION + 2;

interface RequestData {
  scenario: RequestScenario;
  priority: Priority;
  confirmed: Priority;
  revision: number;
  intent: number;
}

/** Only pending requests carry an attempt kind; settled requests cannot remain dirty. */
export type RequestState = RequestData &
  (
    | { phase: 'draft'; dirty: boolean }
    | { phase: 'pending'; dirty: true; attempt: 'initial' | 'retry' | 'reapply' }
    | { phase: 'conflict' | 'offline'; dirty: true }
    | { phase: 'b-confirmed' | 'accepted' | 'reloaded' | 'invalid' | 'stale-ignored'; dirty: false }
  );
export type RequestPhase = RequestState['phase'];
export type RequestAction =
  | { type: 'scenario'; scenario: RequestScenario }
  | { type: 'reset' | 'edit' | 'send' | 'deliver' | 'reload' | 'reapply' | 'retry' };

export const initialRequest = (scenario: RequestScenario = 'success'): RequestState => ({
  scenario,
  phase: 'draft',
  dirty: false,
  priority: 'normal',
  confirmed: 'normal',
  revision: INITIAL_REVISION,
  intent: 0,
});

function deliverResponse(state: RequestState): RequestState {
  if (state.phase === 'b-confirmed') return { ...state, phase: 'stale-ignored' };
  if (state.phase !== 'pending') return state;

  const { attempt, ...request } = state;

  if (attempt !== 'initial' || state.scenario === 'success') {
    return {
      ...request,
      phase: 'accepted',
      confirmed: 'high',
      revision: state.revision + 1,
      dirty: false,
    };
  }
  switch (state.scenario) {
    case 'race':
      return {
        ...request,
        phase: 'b-confirmed',
        confirmed: 'high',
        revision: LATEST_RACE_REVISION,
        dirty: false,
      };
    case 'validation':
      return { ...request, phase: 'invalid', priority: state.confirmed, dirty: false };
    case 'conflict':
      return { ...request, phase: 'conflict', revision: CONFLICT_REVISION };
    case 'offline':
      return { ...request, phase: 'offline' };
  }
}

export function requestReducer(state: RequestState, action: RequestAction): RequestState {
  switch (action.type) {
    case 'scenario':
      return initialRequest(action.scenario);
    case 'reset':
      return initialRequest(state.scenario);
    case 'edit':
      if (state.phase !== 'draft') return state;
      return { ...state, dirty: !state.dirty, priority: state.dirty ? 'normal' : 'high' };
    case 'send':
      if (state.phase !== 'draft' || !state.dirty) return state;
      return {
        ...state,
        phase: 'pending',
        dirty: true,
        attempt: 'initial',
        intent: state.scenario === 'race' ? 2 : 1,
      };
    case 'retry':
      if (state.phase !== 'offline') return state;
      return { ...state, phase: 'pending', attempt: 'retry' };
    case 'reload':
      if (state.phase !== 'conflict') return state;
      return { ...state, phase: 'reloaded', priority: state.confirmed, dirty: false };
    case 'reapply':
      if (state.phase !== 'conflict') return state;
      return { ...state, phase: 'pending', attempt: 'reapply', intent: state.intent + 1 };
    case 'deliver':
      return deliverResponse(state);
  }
}
