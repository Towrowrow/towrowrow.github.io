import type { Locale } from '../../data/profile';
import { labStories } from '../../i18n/labStories';
import type { RequestAction, RequestPhase } from '../../labs/requestMachine';

interface RequestResolutionProps {
  locale: Locale;
  phase: RequestPhase;
  onAction: (action: RequestAction) => void;
}

export function RequestResolution({ locale, phase, onAction }: RequestResolutionProps) {
  const t = labStories[locale].playground;
  if (phase === 'conflict')
    return (
      <div className="reconciliation-actions">
        <button type="button" onClick={() => onAction({ type: 'reload' })}>
          {t.reload}
        </button>
        <button
          type="button"
          className="story-primary"
          onClick={() => onAction({ type: 'reapply' })}
        >
          {t.reapply}
        </button>
      </div>
    );
  if (phase === 'offline')
    return (
      <div className="reconciliation-actions">
        <button type="button" className="story-primary" onClick={() => onAction({ type: 'retry' })}>
          {t.retry} →
        </button>
      </div>
    );
  return null;
}
