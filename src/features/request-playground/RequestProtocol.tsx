import type { PlaygroundMessages } from '../../i18n/playground';
import type { RequestView } from './presentation';
import { requestStages } from './presentation';

interface RequestProtocolProps {
  messages: PlaygroundMessages;
  view: RequestView;
  onDeliver: () => void;
}

export function RequestProtocol({ messages: t, view, onDeliver }: RequestProtocolProps) {
  return (
    <div className="protocol-scene">
      <div className="protocol-heading">
        <span>{t.protocol}</span>
        <span>{t.simulatedEvents}</span>
      </div>
      <ol className="request-trace">
        {requestStages.map((stage, index) => (
          <li className={view.activeStage === stage ? 'trace-active' : ''} key={stage}>
            <span>
              0{index + 1} / {t.trace[stage]}
            </span>
            <p>{stage === 'projection' ? view.raceIntent : t.traceDetails[stage]}</p>
          </li>
        ))}
      </ol>
      <button type="button" disabled={!view.canDeliver} onClick={onDeliver}>
        {view.responseLabel} →
      </button>
      <div className="confirmed-state">
        <span>{t.lastConfirmed}</span>
        <code>{view.confirmedJson}</code>
      </div>
    </div>
  );
}
