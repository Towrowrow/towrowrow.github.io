import type { AgentsMessages } from '../../i18n/agents';
import type { AgentAction, AgentRole, AgentState } from '../../labs/agentMachine';
import { graphRoles, isHumanGate, mainRoles } from '../../labs/agentMachine';
import { connections, roleNames } from './graph';

interface AgentNetworkProps {
  messages: AgentsMessages;
  state: AgentState;
  onAction: (action: AgentAction) => void;
  nextLabel?: string;
}

function rolePresentation(role: AgentRole, state: AgentState, t: AgentsMessages) {
  if (state.selected === role) return { className: 'active', label: t.active };
  if (state.visited.includes(role)) return { className: 'explored', label: t.visited };
  return { className: '', label: t.toExplore };
}

export function AgentNetwork({ messages: t, state, onAction, nextLabel }: AgentNetworkProps) {
  const supportRoles = [
    { role: 'debugger', hint: t.debuggerHint },
    { role: 'documentation', hint: t.documentationHint },
  ] as const;
  return (
    <div className="network-scene">
      <div className="network-caption">
        <span>{t.responsibilities}</span>
        <span>
          {t.step} {state.position + 1} {t.of} {mainRoles.length} ·{' '}
          {roleNames[mainRoles[state.position]]}
        </span>
      </div>
      <div className="agent-constellation">
        <svg
          className="connection-map"
          viewBox="0 0 560 430"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {connections.map((connection) => (
            <path
              key={connection.role}
              className={`connection ${state.selected === connection.role ? 'is-active' : ''}`}
              d={connection.path}
            />
          ))}
        </svg>
        {graphRoles.map((role, index) => {
          const presentation = rolePresentation(role, state, t);
          return (
            <button
              type="button"
              className={`agent-node n-${role} ${presentation.className}`}
              key={role}
              aria-pressed={state.selected === role}
              onClick={() => onAction({ type: 'select', role })}
            >
              <span>
                0{index + 1} / {t.roleCaptions[role]}
              </span>
              <strong>{roleNames[role]}</strong>
              <small>{presentation.label}</small>
            </button>
          );
        })}
        <button
          type="button"
          className="orchestrator-core"
          aria-pressed={state.selected === 'orchestrator'}
          onClick={() => onAction({ type: 'select', role: 'orchestrator' })}
        >
          <span aria-hidden="true">◎</span>
          <strong>Orchestrator</strong>
          <small>{t.orchestratorHint}</small>
        </button>
        {supportRoles.map(({ role, hint }) => (
          <button
            key={role}
            type="button"
            className={`support-node n-${role}`}
            aria-pressed={state.selected === role}
            onClick={() => onAction({ type: 'select', role })}
          >
            {roleNames[role]}
            <small>{hint}</small>
          </button>
        ))}
      </div>
      <div className="step-navigation">
        <button
          type="button"
          disabled={state.position === 0}
          onClick={() => onAction({ type: 'back' })}
        >
          ← {t.previous}
        </button>
        <button
          type="button"
          disabled={isHumanGate(state)}
          onClick={() => onAction({ type: 'next' })}
        >
          {nextLabel ?? t.next} →
        </button>
      </div>
    </div>
  );
}
