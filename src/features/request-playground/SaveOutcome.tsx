import type { Locale } from '../../data/profile';
import { labStories } from '../../i18n/labStories';
import type { RequestAction, RequestState } from '../../labs/requestMachine';
import type { RequestLesson } from './lesson';
import type { RequestView } from './presentation';
import { RequestResolution } from './RequestResolution';

interface SaveOutcomeProps {
  locale: Locale;
  state: RequestState;
  view: RequestView;
  lesson: RequestLesson;
  onAction: (action: RequestAction) => void;
}
export function SaveOutcome({ locale, state, view, lesson, onAction }: SaveOutcomeProps) {
  const t = labStories[locale];
  return (
    <div className="save-outcome">
      <ol className="save-steps" aria-label={locale === 'fr' ? 'Votre parcours' : 'Your journey'}>
        {t.playground.stages.map((label, index) => (
          <li key={label} aria-current={index === lesson.step ? 'step' : undefined}>
            <span aria-hidden="true">{index + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      <div
        id="save-result"
        tabIndex={-1}
        className="save-explanation"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <h3>{lesson.title}</h3>
        <p>{lesson.body}</p>
        <p className="story-next">{lesson.next}</p>
      </div>
      {view.canDeliver && (
        <button
          type="button"
          className="story-primary"
          onClick={() => onAction({ type: 'deliver' })}
        >
          {lesson.receive} →
        </button>
      )}
      <RequestResolution locale={locale} phase={state.phase} onAction={onAction} />
      <div className="saved-summary">
        <span>{t.playground.savedLabel}</span>
        <strong>
          {t.playground.priority} :{' '}
          {state.confirmed === 'high' ? t.playground.high : t.playground.normal}
        </strong>
      </div>
      {lesson.complete && (
        <div className="story-conclusion">
          <p>{t.playground.conclusion}</p>
          <small>{t.playground.skills}</small>
          <button type="button" onClick={() => onAction({ type: 'reset' })}>
            {t.restart} ↺
          </button>
        </div>
      )}
    </div>
  );
}
