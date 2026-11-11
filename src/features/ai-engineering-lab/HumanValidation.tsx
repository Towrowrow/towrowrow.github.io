import type { AgentsMessages } from '../../i18n/agents';
import type { AgentAction, AgentState } from '../../labs/agentMachine';
import { canAcceptAgent, humanChecks, isHumanGate } from '../../labs/agentMachine';

interface HumanValidationProps {
  messages: AgentsMessages;
  state: AgentState;
  onAction: (action: AgentAction) => void;
}

export function HumanValidation({ messages: t, state, onAction }: HumanValidationProps) {
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
        <p>{gate ? t.humanGate : t.humanBefore}</p>
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
          <button className="lab-restart" type="button" onClick={() => onAction({ type: 'reset' })}>
            {t.reset} ↺
          </button>
        )}
      </div>
    </div>
  );
}
