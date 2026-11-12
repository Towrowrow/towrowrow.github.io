import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import { layers } from '../data/engineering';
import type { Locale } from '../data/profile';
import { labStories } from '../i18n/labStories';
import { siteMessages } from '../i18n/site';

export function ArchitectureExplorer({ locale }: { locale: Locale }) {
  const t = siteMessages[locale];
  const copy = labStories[locale];
  const story = copy.architecture;
  const [selected, setSelected] = useState(0);
  const layer = layers[selected];
  const step = story.steps[selected];
  const Icon = layer.icon;
  const last = selected === layers.length - 1;
  return (
    <div className="architecture-explorer story-architecture">
      <div className="explorer-heading">
        <div>
          <p className="eyebrow">{t.architectureLabel}</p>
          <h2>{story.title}</h2>
        </div>
        <p>{t.architectureNote}</p>
      </div>
      <p className="architecture-story-intro">{story.intro}</p>
      <div
        className="architecture-nodes"
        role="group"
        aria-label={
          locale === 'fr' ? 'Le trajet de votre enregistrement' : 'The journey of your save'
        }
      >
        {layers.map((node, index) => {
          const NodeIcon = node.icon;
          return (
            <div className="architecture-node-wrap" key={node.name}>
              <button
                type="button"
                className={selected === index ? 'architecture-node selected' : 'architecture-node'}
                aria-pressed={selected === index}
                aria-controls="layer-detail"
                onClick={() => setSelected(index)}
                onFocus={() => setSelected(index)}
              >
                <span className="node-index">0{index + 1}</span>
                <NodeIcon size={27} />
                <strong>{story.steps[index].name}</strong>
              </button>
              {index < layers.length - 1 && (
                <span className="data-connection" aria-hidden="true">
                  <i />
                  <ArrowRight size={13} />
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="request-legend">
        <span className="legend-dot" />
        {story.legend}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={selected}
          id="layer-detail"
          className="layer-detail"
          aria-live="polite"
          initial={{ opacity: 1, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: -6 }}
          transition={{ duration: 0.16 }}
        >
          <div className="layer-detail-title">
            <Icon />
            <span>
              {selected + 1} / {layers.length}
            </span>
            <h3>{step.title}</h3>
          </div>
          <div className="layer-detail-copy">
            <p>{step.body}</p>
            <p className="architecture-benefit">{step.why}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="architecture-next">
        <button
          type="button"
          className="story-primary"
          onClick={() => setSelected((selected + 1) % layers.length)}
        >
          {last ? story.again : story.next} →
        </button>
      </div>
      {last && (
        <div className="story-conclusion">
          <p>{story.benefit}</p>
          <small>{story.skills}</small>
        </div>
      )}
      <details className="story-technical" data-technical="architecture">
        <summary>{copy.technical}</summary>
        <h3>
          {layer.name} · {layer.role[locale]}
        </h3>
        <code>{layer.contract}</code>
        <p>{layer.body[locale]}</p>
        <div className="tags">
          {layer.stack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </details>
    </div>
  );
}
