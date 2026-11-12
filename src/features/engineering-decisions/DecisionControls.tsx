import type { DecisionsMessages } from '../../i18n/decisions';
import type { ArchitectureEvent, ArchitectureMode } from '../../labs/architecture';
import { architectureEvents, architectureModes } from '../../labs/architecture';
import { isOptionValue } from '../../utils/options';

interface DecisionControlsProps {
  messages: DecisionsMessages;
  mode: ArchitectureMode;
  event: ArchitectureEvent;
  queue: boolean;
  onModeChange: (mode: ArchitectureMode) => void;
  onEventChange: (event: ArchitectureEvent) => void;
  onQueueChange: (checked: boolean) => void;
}

export function DecisionControls({
  messages: t,
  mode,
  event,
  queue,
  onModeChange,
  onEventChange,
  onQueueChange,
}: DecisionControlsProps) {
  return (
    <>
      <div className="architecture-choice" role="group" aria-label={t.decisionLabel}>
        {architectureModes.map((value, index) => (
          <button
            key={value}
            type="button"
            aria-pressed={mode === value}
            onClick={() => onModeChange(value)}
          >
            <span>0{index + 1}</span>
            {t.modes[value]}
          </button>
        ))}
      </div>
      <div className="experiment-strip">
        <label>
          {t.eventLabel}
          <select
            value={event}
            onChange={(event) => {
              const value = event.target.value;
              if (isOptionValue(architectureEvents, value)) onEventChange(value);
            }}
          >
            {architectureEvents.map((value) => (
              <option key={value} value={value}>
                {t.events[value]}
              </option>
            ))}
          </select>
        </label>
        <label className="queue-choice">
          <input
            type="checkbox"
            disabled={mode !== 'services'}
            checked={queue && mode === 'services'}
            onChange={(event) => onQueueChange(event.target.checked)}
          />
          {t.queue}
          <span>{t.queueHint}</span>
        </label>
      </div>
    </>
  );
}
