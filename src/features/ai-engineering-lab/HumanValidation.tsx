import type { Locale } from '../../data/profile';
import type { AgentsMessages } from '../../i18n/agents';
import { labStories } from '../../i18n/labStories';
import type { AgentAction, AgentState } from '../../labs/agentMachine';
import { canAcceptAgent, humanChecks, isHumanGate } from '../../labs/agentMachine';
import { humanLesson } from './lesson';

interface HumanValidationProps {
  locale: Locale;
  messages: AgentsMessages;
  state: AgentState;
  onAction: (action: AgentAction) => void;
}

export function HumanValidation({ locale, messages: t, state, onAction }: HumanValidationProps) {
  const gate = isHumanGate(state);
  let feedback = t.notAccepted;
  if (state.accepted) feedback = t.accepted;
  else if (state.revision) feedback = t.revisionRequested;

  return (
    <div className="human-validation">
      <div>
        <span className="human-label">{t.humanLabel}</span>
        <h3>{t.humanTitle}</h3>
      </div>
      <div className="human-actions">
        <p role="status" aria-live="polite">
          {humanLesson(state, locale)}
        </p>
        {gate && (
          <div className="human-checks">
            {humanChecks.map((key) => (
              <label key={key}>
                <input
                  type="checkbox"
                  checked={state[key]}
                  disabled={state.accepted}
                  onChange={(event) =>
                    onAction({ type: 'check', key, value: event.target.checked })
                  }
                />
                {t.humanChecks[key]}
              </label>
            ))}
          </div>
        )}
        <div className="human-buttons">
          <button
            type="button"
            disabled={!gate || state.accepted}
            onClick={() => onAction({ type: 'revise' })}
          >
            {t.revise}
          </button>
          <button
            type="button"
            disabled={!canAcceptAgent(state)}
            onClick={() => onAction({ type: 'accept' })}
          >
            {t.accept}
          </button>
        </div>
        <span aria-live="polite">{feedback}</span>
        {state.accepted && (
          <div className="story-conclusion">
            <p>{labStories[locale].agents.benefit}</p>
            <small>{labStories[locale].agents.skills}</small>
            <button
              className="lab-restart"
              type="button"
              onClick={() => onAction({ type: 'reset' })}
            >
              {t.reset} ↺
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
