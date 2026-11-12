import { useReducer } from 'react';

import type { Locale } from '../../data/profile';
import { labStories } from '../../i18n/labStories';
import { agentReducer, agentScenarios, initialAgents } from '../../labs/agentMachine';
import { isOptionValue } from '../../utils/options';
import { AgentDeliverable } from './AgentDeliverable';
import { AgentNetwork } from './AgentNetwork';
import { agentArtifact } from './artifacts';
import { HumanValidation } from './HumanValidation';
import { agentStoryMessages } from './lesson';

export function AIEngineeringLab({ locale }: { locale: Locale }) {
  const copy = labStories[locale];
  const story = copy.agents;
  const t = agentStoryMessages(locale);
  const [state, dispatch] = useReducer(agentReducer, undefined, () => initialAgents());
  const artifact = agentArtifact(locale, state);
  return (
    <section id="ai" className="lab-shell scope-agents story-agents">
      <div className="product-canvas">
        <div className="agent-experience">
          <div className="agent-title">
            <span>
              {t.agentLabel}
              <br />
              HUMAN-GUIDED, AGENT-POWERED
            </span>
            <div>
              <h2>{story.title}</h2>
              <p>{story.intro}</p>
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
                    {story.scenarios[scenario]}
                  </option>
                ))}
              </select>
            </label>
            <span>{t.agentSimulation}</span>
          </div>
          <p className="agent-situation">{story.situations[state.scenario]}</p>
          <div className="orchestration-stage">
            <AgentNetwork
              messages={t}
              state={state}
              onAction={dispatch}
              nextLabel={story.next[state.position]}
            />
            <AgentDeliverable
              locale={locale}
              messages={t}
              state={state}
              artifact={artifact}
              onAction={dispatch}
            />
          </div>
          <HumanValidation locale={locale} messages={t} state={state} onAction={dispatch} />
        </div>
      </div>
    </section>
  );
}
