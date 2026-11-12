import type { Locale } from '../../data/profile';
import type { AgentsMessages } from '../../i18n/agents';
import type { AgentArtifact } from '../../i18n/artifacts';
import { labStories } from '../../i18n/labStories';
import type { AgentAction, AgentState } from '../../labs/agentMachine';
import { canDiagnose } from '../../labs/agentMachine';
import { agentLesson } from './lesson';

interface AgentDeliverableProps {
  locale: Locale;
  messages: AgentsMessages;
  state: AgentState;
  artifact: AgentArtifact;
  onAction: (action: AgentAction) => void;
}
export function AgentDeliverable({
  locale,
  messages: t,
  state,
  artifact,
  onAction,
}: AgentDeliverableProps) {
  const story = agentLesson(state, locale);
  const copy = labStories[locale];
  return (
    <div className="deliverable-scene story-deliverable">
      <div className="deliverable-meta">
        <span>{copy.simulation}</span>
      </div>
      <div role="status" aria-live="polite" aria-atomic="true">
        <h3>{story.title}</h3>
        <p>{story.body}</p>
        <p className="agent-reason">{story.why}</p>
      </div>
      <div
        className="deliverable-body"
        key={`${state.scenario}-${state.selected}-${state.corrected}`}
      >
        {canDiagnose(state) && (
          <button
            type="button"
            className="story-primary"
            onClick={() => onAction({ type: 'diagnose' })}
          >
            {t.diagnose} →
          </button>
        )}
        {state.selected === 'debugger' && (
          <button
            type="button"
            className="story-primary"
            onClick={() => onAction({ type: 'return' })}
          >
            {t.returnDev} →
          </button>
        )}
      </div>
      <details className="story-technical" data-technical="agents">
        <summary>{copy.technical}</summary>
        <p>
          {artifact.kind} · {artifact.title}
        </p>
        <p>{artifact.intro}</p>
        <ol>
          {artifact.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        {artifact.code && <pre>{artifact.code}</pre>}
        <p>{artifact.status}</p>
      </details>
    </div>
  );
}
