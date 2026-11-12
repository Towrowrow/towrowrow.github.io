import { useState } from 'react';

import type { Locale } from '../../data/profile';
import { decisionsMessages } from '../../i18n/decisions';
import { labStories } from '../../i18n/labStories';
import type { ArchitectureEvent, ArchitectureMode } from '../../labs/architecture';
import { architectureModel } from '../../labs/architecture';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { DecisionControls } from './DecisionControls';
import { decisionConsequences } from './presentation';
import { decisionStoryMessages } from './story';

export function EngineeringDecisions({ locale }: { locale: Locale }) {
  const copy = labStories[locale];
  const story = copy.decisions;
  const t = decisionStoryMessages(locale);
  const technical = decisionsMessages[locale];
  const [mode, setMode] = useState<ArchitectureMode>('modular');
  const [event, setEvent] = useState<ArchitectureEvent>('healthy');
  const [queue, setQueue] = useState(false);
  const model = architectureModel(mode, event, queue);
  const consequences = decisionConsequences(model, technical);
  return (
    <section id="decisions" className="lab-shell scope-decisions story-decisions">
      <div className="product-canvas">
        <div className="decision-experience">
          <div className="decision-masthead">
            <span>{technical.decisionLabel}</span>
            <span>{technical.concept}</span>
          </div>
          <h2>{story.title}</h2>
          <p className="decision-deck">{story.intro}</p>
          <DecisionControls
            messages={t}
            mode={mode}
            event={event}
            queue={queue}
            onModeChange={setMode}
            onEventChange={setEvent}
            onQueueChange={setQueue}
          />
          <div className="decision-trigger">
            <button
              type="button"
              className="story-primary"
              onClick={() => setEvent(event === 'crash' ? 'healthy' : 'crash')}
            >
              {event === 'crash' ? story.restore : story.tryFailure} →
            </button>
          </div>
          <ArchitectureDiagram
            messages={t}
            model={model}
            mode={mode}
            event={event}
            showProcessTags={false}
          />
          {event !== 'healthy' && (
            <div className="story-conclusion">
              <p>{story.benefit}</p>
              <small>{story.skills}</small>
            </div>
          )}
          <details className="story-technical" data-technical="decisions">
            <summary>{copy.technical}</summary>
            <ArchitectureDiagram messages={technical} model={model} mode={mode} event={event} />
            <div className="consequence-ledger">
              {consequences.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.text}</strong>
                </div>
              ))}
            </div>
            <h3>{technical.assumptions}</h3>
            <p>{technical.assumptionsText}</p>
          </details>
        </div>
      </div>
    </section>
  );
}
