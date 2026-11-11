import { useState } from 'react';

import type { Locale } from '../data/profile';
import type { Domain } from '../data/skills';
import { expertise } from '../data/skills';
import { siteMessages } from '../i18n/site';
export function ExpertiseSection({ locale }: { locale: Locale }) {
  const t = siteMessages[locale];
  const [filter, setFilter] = useState<Domain | 'all'>('all');
  const filterLabels: Record<Domain | 'all', string> = {
    all: t.all,
    frontend: 'Frontend',
    backend: 'Backend',
    architecture: 'Architecture',
    ai: 'AI & Automation',
  };

  const domainHeadings = {
    frontend: { label: 'Frontend', caption: 'EXPERIENCE' },
    backend: { label: 'Backend', caption: 'SYSTEMS' },
  };
  const mainDomains = expertise.flatMap((item) => {
    if (item.id !== 'frontend' && item.id !== 'backend') return [];
    return [{ ...item, ...domainHeadings[item.id] }];
  });
  return (
    <section id="expertise" className="expertise-section-new">
      <div className="wrap">
        <div className="expertise-heading">
          <p className="eyebrow">{t.expertLabel}</p>
          <div>
            <h2>{t.expertTitle}</h2>
            <p>{t.expertIntro}</p>
          </div>
        </div>
        <div className="expertise-pair">
          {mainDomains.map((item, i) => (
            <article className="expertise-side" key={item.id}>
              <span className="domain-index">
                0{i + 1} / {item.caption}
              </span>
              <h3>{item.label}</h3>
              <p className="expertise-subtitle">{item.subtitle[locale]}</p>
              <p>{item.description[locale]}</p>
              <div className="tech-line">{item.stack.slice(0, 5).join(' · ')}</div>
            </article>
          ))}
        </div>
        <div className="expertise-foundation">
          <span>{t.foundation}</span>
          <p>{t.foundationText}</p>
        </div>
        <div className="toolkit-new">
          <div className="toolkit-title">
            <h3>{t.toolkit}</h3>
            <div className="filters" role="group" aria-label={t.toolkit}>
              {(['all', 'frontend', 'backend', 'architecture', 'ai'] as const).map((key) => (
                <button
                  type="button"
                  key={key}
                  aria-pressed={filter === key}
                  onClick={() => setFilter(key)}
                >
                  {filterLabels[key]}
                </button>
              ))}
            </div>
          </div>
          <div className="technology-index" aria-live="polite">
            {expertise
              .filter((e) => filter === 'all' || e.id === filter)
              .flatMap((item) =>
                item.stack.map((tech) => (
                  <span key={`${item.id}-${tech}`}>
                    <i aria-hidden="true" />
                    {tech}
                  </span>
                )),
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
