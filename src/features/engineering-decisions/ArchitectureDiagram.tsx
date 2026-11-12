import type { DecisionsMessages } from '../../i18n/decisions';
import type {
  ArchitectureEvent,
  ArchitectureMode,
  ArchitectureModel,
} from '../../labs/architecture';
import { architectureNodes } from '../../labs/architecture';
import { connectionView, nodeClass } from './presentation';

interface ArchitectureDiagramProps {
  messages: DecisionsMessages;
  model: ArchitectureModel;
  mode: ArchitectureMode;
  event: ArchitectureEvent;
  showProcessTags?: boolean;
}

export function ArchitectureDiagram({
  messages: t,
  model,
  mode,
  event,
  showProcessTags = true,
}: ArchitectureDiagramProps) {
  return (
    <div className="system-model" data-kind={mode} data-event={event}>
      <div className="deployment-boundary">
        <span className="boundary-label">{t.units[mode]}</span>
        <div className="model-nodes">
          {architectureNodes.map((node, index) => {
            const status = model.statuses[node];
            const connection = connectionView(node === 'documents', model, event, t);
            return (
              <div className="node-and-edge" key={node}>
                <div className={`model-node ${nodeClass(status)}`}>
                  {showProcessTags && (
                    <span className="process-tag">
                      {model.distributed ? 'SERVICE' : 'MODULE'} / 0{index + 1}
                    </span>
                  )}
                  <strong>{t.nodes[node]}</strong>
                  <small>{t.nodeRoles[node]}</small>
                  <span className="node-state">{t.statuses[status]}</span>
                </div>
                {node !== 'notifications' && (
                  <span className={`model-link ${connection.className}`}>{connection.label}</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="storage-line">
          <span>{t.process[mode]}</span>
          <span>{t.storage[mode]}</span>
        </div>
      </div>
      <div className="model-verdict" aria-live="polite">
        <span className="verdict-mark" aria-hidden="true">
          ↳
        </span>
        <p>{t.outcomes[model.outcome]}</p>
      </div>
    </div>
  );
}
