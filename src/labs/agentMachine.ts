export const graphRoles = ['architect', 'developer', 'tester', 'reviewer'] as const;
export const mainRoles = [...graphRoles, 'human'] as const;
export const agentScenarios = ['endpoint', 'regression', 'refactor'] as const;
export const humanChecks = ['criteria', 'evidence'] as const;
export type MainRole = (typeof mainRoles)[number];
export type AgentRole = MainRole | 'orchestrator' | 'debugger' | 'documentation';
export type AgentScenario = (typeof agentScenarios)[number];
export type AgentPosition = 0 | 1 | 2 | 3 | 4;
const HUMAN_POSITION: AgentPosition = 4;
const rolePositions: Record<MainRole, AgentPosition> = {
  architect: 0,
  developer: 1,
  tester: 2,
  reviewer: 3,
  human: HUMAN_POSITION,
};

export interface AgentState {
  scenario: AgentScenario;
  position: AgentPosition;
  selected: AgentRole;
  visited: readonly AgentRole[];
  diagnosed: boolean;
  corrected: boolean;
  revision: boolean;
  criteria: boolean;
  evidence: boolean;
  accepted: boolean;
}
export type AgentAction =
  | { type: 'scenario'; scenario: AgentScenario }
  | { type: 'select'; role: AgentRole }
  | { type: 'check'; key: (typeof humanChecks)[number]; value: boolean }
  | { type: 'next' | 'back' | 'diagnose' | 'return' | 'revise' | 'accept' | 'reset' };

export const initialAgents = (scenario: AgentScenario = 'endpoint'): AgentState => ({
  scenario,
  position: 0,
  selected: 'architect',
  visited: ['architect'],
  diagnosed: false,
  corrected: false,
  revision: false,
  criteria: false,
  evidence: false,
  accepted: false,
});

export function isHumanGate(state: AgentState) {
  return state.position === HUMAN_POSITION;
}
export function canAcceptAgent(state: AgentState) {
  const allRolesExplored = graphRoles.every((role) => state.visited.includes(role));
  const regressionResolved =
    state.scenario !== 'regression' || (state.diagnosed && state.corrected);
  return (
    isHumanGate(state) &&
    allRolesExplored &&
    regressionResolved &&
    state.criteria &&
    state.evidence &&
    !state.accepted
  );
}
export function canDiagnose(state: AgentState) {
  return (
    state.selected === 'tester' &&
    state.scenario === 'regression' &&
    !state.corrected &&
    !state.accepted
  );
}
function isMainRole(role: AgentRole): role is MainRole {
  return mainRoles.some((mainRole) => mainRole === role);
}
function visit(state: AgentState, role: AgentRole): AgentState {
  return {
    ...state,
    selected: role,
    position: isMainRole(role) ? rolePositions[role] : state.position,
    visited: state.visited.includes(role) ? state.visited : [...state.visited, role],
  };
}

export function agentReducer(state: AgentState, action: AgentAction): AgentState {
  switch (action.type) {
    case 'scenario':
      return initialAgents(action.scenario);
    case 'reset':
      return initialAgents(state.scenario);
    case 'select':
      return visit(state, action.role);
    case 'next':
      return visit(state, mainRoles[state.position + 1] ?? mainRoles[state.position]);
    case 'back':
      return visit(state, mainRoles[state.position - 1] ?? mainRoles[state.position]);
    case 'diagnose':
      if (!canDiagnose(state)) return state;
      return visit({ ...state, diagnosed: true }, 'debugger');
    case 'return':
      if (state.selected !== 'debugger' || state.accepted) return state;
      return visit({ ...state, corrected: state.diagnosed, revision: true }, 'developer');
    case 'revise':
      if (!isHumanGate(state) || state.accepted) return state;
      return visit({ ...state, revision: true, criteria: false, evidence: false }, 'developer');
    case 'check':
      if (!isHumanGate(state) || state.accepted) return state;
      return { ...state, [action.key]: action.value };
    case 'accept':
      return canAcceptAgent(state) ? { ...state, accepted: true } : state;
  }
}
