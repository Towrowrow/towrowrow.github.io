import { useState } from 'react';

import type { Locale } from '../../data/profile';
import { decisionsMessages } from '../../i18n/decisions';
import type { ArchitectureEvent, ArchitectureMode } from '../../labs/architecture';
import { architectureModel } from '../../labs/architecture';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { DecisionControls } from './DecisionControls';
import { decisionConsequences } from './presentation';

export function EngineeringDecisions({ locale }: { locale: Locale }) {
  const t = decisionsMessages[locale];
  const [mode, setMode] = useState<ArchitectureMode>('modular');
  const [event, setEvent] = useState<ArchitectureEvent>('healthy');
  const [queue, setQueue] = useState(false);
  const model = architectureModel(mode, event, queue);
  const consequences = decisionConsequences(model, t);

  return (
    <section id="decisions" className="lab-shell scope-decisions">
      <div className="product-canvas">
        <div className="decision-experience">
          <div className="decision-masthead">
            <span>{t.decisionLabel}</span>
            <span>{t.concept}</span>
          </div>
          <h2>{t.decisionTitle}</h2>
          <p className="decision-deck">{t.decisionIntro}</p>
          <DecisionControls
            messages={t}
            mode={mode}
            event={event}
            queue={queue}
            onModeChange={setMode}
            onEventChange={setEvent}
            onQueueChange={setQueue}
          />
          <ArchitectureDiagram messages={t} model={model} mode={mode} event={event} />
          <div className="consequence-ledger">
            {consequences.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.text}</strong>
              </div>
            ))}
          </div>
          <details className="reasoning-note">
            <summary>{t.assumptions}</summary>
            <p>{t.assumptionsText}</p>
          </details>
        </div>
      </div>
    </section>
  );
}
