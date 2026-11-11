import type { AgentRole } from '../../labs/agentMachine';

export const roleNames: Record<AgentRole, string> = {
  architect: 'Architect',
  developer: 'Developer',
  tester: 'Tester',
  reviewer: 'Reviewer',
  orchestrator: 'Orchestrator',
  debugger: 'Debugger',
  documentation: 'Documentation',
  human: 'Human',
};
export const connections = [
  { role: 'architect', path: 'M280 205 C210 205 190 75 100 75' },
  { role: 'developer', path: 'M280 205 C350 205 370 75 460 75' },
  { role: 'tester', path: 'M280 205 C380 205 380 300 460 300' },
  { role: 'reviewer', path: 'M280 205 C240 250 210 340 100 340' },
  { role: 'debugger', path: 'M280 205 L85 205' },
  { role: 'documentation', path: 'M280 205 L280 400' },
] as const satisfies readonly { role: AgentRole; path: string }[];
