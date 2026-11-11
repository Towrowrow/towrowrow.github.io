import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import { layers } from '../data/engineering';
import type { Locale } from '../data/profile';
import { siteMessages } from '../i18n/site';

export function ArchitectureExplorer({ locale }: { locale: Locale }) {
  const t = siteMessages[locale];
  const [selected, setSelected] = useState(0);
  const layer = layers[selected];
  const Icon = layer.icon;
  return (
    <div className="architecture-explorer">
      <div className="explorer-heading">
        <div>
          <p className="eyebrow">{t.architectureLabel}</p>
          <h2>{t.architectureTitle}</h2>
        </div>
        <p>{t.architectureNote}</p>
      </div>
      <div
        className="architecture-nodes"
        role="group"
        aria-label={locale === 'fr' ? 'Couches de l’architecture' : 'Architecture layers'}
      >
        {layers.map((node, i) => {
          const NodeIcon = node.icon;
          return (
            <div className="architecture-node-wrap" key={node.name}>
              <button
                className={selected === i ? 'architecture-node selected' : 'architecture-node'}
                aria-pressed={selected === i}
                aria-controls="layer-detail"
                onClick={() => setSelected(i)}
                onFocus={() => setSelected(i)}
              >
                <span className="node-index">0{i + 1}</span>
                <NodeIcon size={27} />
                <strong>{node.name}</strong>
                <span className="node-hint">{node.role[locale]}</span>
              </button>
              {i < layers.length - 1 && (
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
        {locale === 'fr'
          ? 'Requête → traitement → persistance · réponse en retour'
          : 'Request → processing → persistence · response back'}
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
              0{selected + 1} / {layer.name}
            </span>
            <h3>{layer.role[locale]}</h3>
            <code>{layer.contract}</code>
          </div>
          <div className="layer-detail-copy">
            <p>{layer.body[locale]}</p>
            <div className="tags">
              {layer.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
