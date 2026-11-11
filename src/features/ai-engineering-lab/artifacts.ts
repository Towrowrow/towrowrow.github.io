import type { Locale } from '../../data/profile';
import type { AgentArtifact } from '../../i18n/artifacts.ts';
import { agentArtifacts } from '../../i18n/artifacts.ts';
import type { AgentState } from '../../labs/agentMachine';

/** Resolve shared prose and scenario overrides without embedding translations in the model. */
export function agentArtifact(locale: Locale, state: AgentState): AgentArtifact {
  const catalog = agentArtifacts[locale];
  const artifact = {
    ...catalog.base[state.selected],
    ...catalog.scenarios[state.scenario]?.[state.selected],
  };
  if (state.scenario === 'regression' && state.selected === 'tester' && state.corrected) {
    return { ...artifact, ...catalog.correctedRegression };
  }
  return artifact;
}
