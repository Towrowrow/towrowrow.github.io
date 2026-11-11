import type { AgentsMessages } from '../../i18n/agents';
import type { AgentArtifact } from '../../i18n/artifacts';
import type { AgentAction, AgentState } from '../../labs/agentMachine';
import { canDiagnose } from '../../labs/agentMachine';

interface AgentDeliverableProps {
  messages: AgentsMessages;
  state: AgentState;
  artifact: AgentArtifact;
  onAction: (action: AgentAction) => void;
}

export function AgentDeliverable({
  messages: t,
  state,
  artifact,
  onAction,
}: AgentDeliverableProps) {
  return (
    <div className="deliverable-scene" aria-live="polite">
      <div className="deliverable-meta">
        <span>{t.artifact}</span>
        <span>{artifact.kind}</span>
      </div>
      <h3>{artifact.title}</h3>
      <p>{artifact.intro}</p>
      <div
        className="deliverable-body"
        key={`${state.scenario}-${state.selected}-${state.corrected}`}
      >
        <ol>
          {artifact.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        {artifact.code && <pre>{artifact.code}</pre>}
        {canDiagnose(state) && (
          <button type="button" onClick={() => onAction({ type: 'diagnose' })}>
            {t.diagnose} →
          </button>
        )}
        {state.selected === 'debugger' && (
          <button type="button" onClick={() => onAction({ type: 'return' })}>
            {t.returnDev} →
          </button>
        )}
      </div>
      <div className="deliverable-status">
        <span>{t.artifactStatus}</span>
        <strong>{state.accepted ? t.accepted : artifact.status}</strong>
      </div>
    </div>
  );
}
