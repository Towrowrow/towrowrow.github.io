import { useReducer } from 'react';

import type { Locale } from '../../data/profile';
import { labStories } from '../../i18n/labStories';
import { playgroundMessages } from '../../i18n/playground';
import { initialRequest, requestReducer, requestScenarios } from '../../labs/requestMachine';
import { isOptionValue } from '../../utils/options';
import { requestLesson } from './lesson';
import { requestView } from './presentation';
import { RequestDocument } from './RequestDocument';
import { RequestProtocol } from './RequestProtocol';
import { SaveOutcome } from './SaveOutcome';

export function RequestPlayground({ locale }: { locale: Locale }) {
  const copy = labStories[locale];
  const t = copy.playground;
  const technical = playgroundMessages[locale];
  const [state, dispatch] = useReducer(requestReducer, undefined, () => initialRequest('conflict'));
  const view = requestView(state, technical);
  const lesson = requestLesson(state, locale);
  return (
    <section id="playground" className="lab-shell scope-playground story-playground">
      <div className="product-canvas">
        <div className="playground-experience">
          <div className="playground-title">
            <span className="chapter-side">{technical.playgroundLabel}</span>
            <div>
              <h2>{t.title}</h2>
              <p>{t.intro}</p>
            </div>
            <span className="simulation-label">{copy.simulation}</span>
          </div>
          <div className="play-controls">
            <label>
              {t.scenario}
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
                    {t.scenarios[scenario]}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" onClick={() => dispatch({ type: 'reset' })}>
              {copy.restart} ↺
            </button>
          </div>
          <div className="request-workbench">
            <RequestDocument
              locale={locale}
              state={state}
              view={view}
              lesson={lesson}
              onEdit={() => dispatch({ type: 'edit' })}
              onSend={() => dispatch({ type: 'send' })}
            />
            <SaveOutcome
              locale={locale}
              state={state}
              view={view}
              lesson={lesson}
              onAction={dispatch}
            />
          </div>
          <details className="story-technical" data-technical="playground">
            <summary>{copy.technical}</summary>
            <div className="technical-request-layout">
              <div>
                <pre>{technical.contract}</pre>
                <p>{technical.contractNote}</p>
                <p>
                  {view.phaseText.title} {view.phaseText.description}
                </p>
              </div>
              <RequestProtocol
                messages={technical}
                view={view}
                onDeliver={() => dispatch({ type: 'deliver' })}
              />
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
