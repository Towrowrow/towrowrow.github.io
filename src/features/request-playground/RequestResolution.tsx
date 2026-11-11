import type { PlaygroundMessages } from '../../i18n/playground';
import type { RequestAction, RequestPhase } from '../../labs/requestMachine';

interface RequestResolutionProps {
  messages: PlaygroundMessages;
  phase: RequestPhase;
  onAction: (action: RequestAction) => void;
}

export function RequestResolution({ messages: t, phase, onAction }: RequestResolutionProps) {
  if (phase === 'conflict')
    return (
      <div className="reconciliation-actions" aria-live="polite">
        <strong>{t.resolve}</strong>
        <div>
          <button type="button" onClick={() => onAction({ type: 'reload' })}>
            {t.reload}
          </button>
          <button type="button" onClick={() => onAction({ type: 'reapply' })}>
            {t.reapply}
          </button>
        </div>
      </div>
    );
  if (phase === 'offline')
    return (
      <div className="reconciliation-actions">
        <strong>{t.contractNote}</strong>
        <button type="button" onClick={() => onAction({ type: 'retry' })}>
          {t.retry} →
        </button>
      </div>
    );
  return null;
}
