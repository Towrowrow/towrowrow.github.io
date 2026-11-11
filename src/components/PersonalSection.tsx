import type { Locale } from '../data/profile';
import { siteMessages } from '../i18n/site';
export function PersonalSection({ locale, years }: { locale: Locale; years: number }) {
  const t = siteMessages[locale];
  return (
    <section id="about" className="personal-section">
      <div className="wrap">
        <p className="eyebrow">{t.aboutLabel}</p>
        <div className="personal-layout">
          <div>
            <blockquote>« {t.quote} »</blockquote>
            <div className="personal-caption">
              <strong>{years.toString().padStart(2, '0')}</strong>
              <span>{t.personalYears}</span>
            </div>
          </div>
          <figure className="portrait">
            <img
              src="/images/remi-tilmant.webp"
              alt={t.portrait}
              width="400"
              height="400"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              Rémi Tilmant <span>/ Software Engineer</span>
            </figcaption>
          </figure>
        </div>
        <div className="personal-story">
          {t.personal.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
