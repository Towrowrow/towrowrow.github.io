import { useReducer } from 'react';

import type { Locale } from '../../data/profile';
import { playgroundMessages } from '../../i18n/playground';
import { initialRequest, requestReducer, requestScenarios } from '../../labs/requestMachine';
import { isOptionValue } from '../../utils/options';
import { requestView } from './presentation';
import { RequestDocument } from './RequestDocument';
import { RequestProtocol } from './RequestProtocol';
import { RequestResolution } from './RequestResolution';

export function RequestPlayground({ locale }: { locale: Locale }) {
  const t = playgroundMessages[locale];
  const [state, dispatch] = useReducer(requestReducer, undefined, () => initialRequest());
  const view = requestView(state, t);

  return (
    <section id="playground" className="lab-shell scope-playground">
      <div className="product-canvas">
        <div className="playground-experience">
          <div className="playground-title">
            <span className="chapter-side">{t.playgroundLabel}</span>
            <div>
              <h2>{t.playgroundTitle}</h2>
              <p>{t.playgroundIntro}</p>
            </div>
            <span className="simulation-label">{t.localSimulation}</span>
          </div>
          <div className="play-controls">
            <label>
              {t.scenarioLabel}
              <select
                value={state.scenario}
                onChange={(event) => {
                  const value = event.target.value;
                  if (isOptionValue(requestScenarios, value))
                    dispatch({ type: 'scenario', scenario: value });
                }}
              >
                {requestScenarios.map((scenario) => (
                  <option key={scenario} value={scenario}>
                    {t.requestScenarios[scenario]}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" onClick={() => dispatch({ type: 'reset' })}>
              {t.reset} ↺
            </button>
          </div>
          <div className="request-workbench">
            <RequestDocument
              messages={t}
              state={state}
              view={view}
              onEdit={() => dispatch({ type: 'edit' })}
              onSend={() => dispatch({ type: 'send' })}
            />
            <RequestProtocol
              messages={t}
              view={view}
              onDeliver={() => dispatch({ type: 'deliver' })}
            />
          </div>
          <RequestResolution messages={t} phase={state.phase} onAction={dispatch} />
          <details className="protocol-detail">
            <summary>{t.inspectContract}</summary>
            <pre>{t.contract}</pre>
            <p>{t.contractNote}</p>
          </details>
        </div>
      </div>
    </section>
  );
}
