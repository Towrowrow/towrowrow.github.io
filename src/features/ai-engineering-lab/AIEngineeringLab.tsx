import { useReducer } from 'react';

import type { Locale } from '../../data/profile';
import { agentsMessages } from '../../i18n/agents';
import { agentReducer, agentScenarios, initialAgents } from '../../labs/agentMachine';
import { isOptionValue } from '../../utils/options';
import { AgentDeliverable } from './AgentDeliverable';
import { AgentNetwork } from './AgentNetwork';
import { agentArtifact } from './artifacts';
import { HumanValidation } from './HumanValidation';

export function AIEngineeringLab({ locale }: { locale: Locale }) {
  const t = agentsMessages[locale];
  const [state, dispatch] = useReducer(agentReducer, undefined, () => initialAgents());
  const artifact = agentArtifact(locale, state);

  return (
    <section id="ai" className="lab-shell scope-agents">
      <div className="product-canvas">
        <div className="agent-experience">
          <div className="agent-title">
            <span>
              {t.agentLabel}
              <br />
              HUMAN-GUIDED, AGENT-POWERED
            </span>
            <div>
              <h2>{t.agentTitle}</h2>
              <p>{t.agentIntro}</p>
            </div>
          </div>
          <div className="agent-control-strip">
            <label>
              {t.agentScenario}
              <select
                value={state.scenario}
                onChange={(event) => {
                  const value = event.target.value;
                  if (isOptionValue(agentScenarios, value))
                    dispatch({ type: 'scenario', scenario: value });
                }}
              >
                {agentScenarios.map((scenario) => (
                  <option key={scenario} value={scenario}>
                    {t.agentScenarios[scenario]}
                  </option>
                ))}
              </select>
            </label>
            <span>{t.agentSimulation}</span>
          </div>
          <div className="orchestration-stage">
            <AgentNetwork messages={t} state={state} onAction={dispatch} />
            <AgentDeliverable messages={t} state={state} artifact={artifact} onAction={dispatch} />
          </div>
          <HumanValidation messages={t} state={state} onAction={dispatch} />
        </div>
      </div>
    </section>
  );
}
