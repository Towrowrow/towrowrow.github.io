import type { PlaygroundMessages } from '../../i18n/playground';
import type { RequestState } from '../../labs/requestMachine';
import type { RequestView } from './presentation';

interface RequestDocumentProps {
  messages: PlaygroundMessages;
  state: RequestState;
  view: RequestView;
  onEdit: () => void;
  onSend: () => void;
}

export function RequestDocument({
  messages: t,
  state,
  view,
  onEdit,
  onSend,
}: RequestDocumentProps) {
  const text = view.phaseText;
  return (
    <div className="document-scene">
      <div className="document-meta">
        <span>{t.document}</span>
        <span>{text.status}</span>
      </div>
      <span className="document-number">ADR / 014</span>
      <h3>{view.title}</h3>
      <p className="document-context">{t.synthetic}</p>
      <div className="edit-row">
        <span>{t.priority}</span>
        <strong>
          {view.priority}
          {view.provisional ? ` · ${t.provisional}` : ''}
        </strong>
        <button type="button" disabled={!view.canEdit} onClick={onEdit}>
          {state.dirty ? t.undo : t.edit}
        </button>
      </div>
      <div className="projection">
        <span>{t.projectionLabel}</span>
        <strong>
          {text.projection}
          {!view.provisional ? ` · ${t.revision} ${state.revision}` : ''}
        </strong>
      </div>
      <div className="document-actions">
        <button type="button" disabled={!view.canSave} onClick={onSend}>
          {t.send} ↗
        </button>
      </div>
      <div className="request-feedback" aria-live="polite">
        <strong>{text.title}</strong>
        <p>{text.description}</p>
      </div>
    </div>
  );
}
