import type { Locale } from '../../data/profile';
import { labStories } from '../../i18n/labStories';
import type { RequestState } from '../../labs/requestMachine';
import type { RequestLesson } from './lesson';
import type { RequestView } from './presentation';

interface RequestDocumentProps {
  locale: Locale;
  state: RequestState;
  view: RequestView;
  lesson: RequestLesson;
  onEdit: () => void;
  onSend: () => void;
}

export function RequestDocument({
  locale,
  state,
  view,
  lesson,
  onEdit,
  onSend,
}: RequestDocumentProps) {
  const t = labStories[locale].playground;
  return (
    <div className="document-scene">
      <div className="document-meta">
        <span>{t.document}</span>
      </div>
      <h3>{t.documentTitle}</h3>
      <p className="document-context">{t.example}</p>
      <div className="edit-row">
        <span>{t.priority}</span>
        <strong>{state.priority === 'high' ? t.high : t.normal}</strong>
        <button
          type="button"
          disabled={!view.canEdit}
          onClick={onEdit}
          className={!state.dirty && view.canEdit ? 'story-primary' : ''}
        >
          {state.dirty ? t.undo : t.edit}
        </button>
      </div>
      <div className="projection">
        <strong>{lesson.status}</strong>
      </div>
      <div className="document-actions">
        {view.canEdit && (
          <button
            type="button"
            disabled={!view.canSave}
            onClick={onSend}
            className={view.canSave ? 'story-primary' : ''}
          >
            {t.save} ↗
          </button>
        )}
        {!view.canEdit && !lesson.complete && (
          <a className="save-followup" href="#save-result">
            {t.continue} →
          </a>
        )}
      </div>
    </div>
  );
}
