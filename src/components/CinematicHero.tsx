import { ArrowDown, ArrowUpRight, Braces, Code2, Database, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useContext } from 'react';

import type { Locale } from '../data/profile';
import { profile } from '../data/profile';
import { siteMessages } from '../i18n/site';
import { StaticRenderingContext } from '../rendering';

export function CinematicHero({ locale, years }: { locale: Locale; years: number }) {
  const isStatic = useContext(StaticRenderingContext);
  const t = siteMessages[locale].hero;
  return (
    <section className="hero-v2 wrap">
      <div className="hero-v2-top">
        <span className="eyebrow">
          <i />
          {t.eyebrow}
        </span>
        <span className="folio-index">PORTFOLIO / ENGINEERING</span>
      </div>
      <motion.div
        initial={isStatic ? false : { opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="hero-name">
          Rémi <em>Tilmant</em>
          <span className="name-period">.</span>
        </h1>
      </motion.div>
      <div className="hero-stage">
        <motion.div
          className="hero-statement"
          initial={isStatic ? false : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <span className="small-label">SOFTWARE ENGINEERING, END TO END</span>
          <h2>
            {locale === 'fr' ? (
              <>
                Du premier pixel
                <br />à la dernière <em>requête.</em>
              </>
            ) : (
              <>
                From the first pixel
                <br />
                to the final <em>query.</em>
              </>
            )}
          </h2>
          <p>{t.heroText}</p>
          <div className="hero-actions">
            <a className="button primary" href="#expertise">
              {t.explore}
              <ArrowDown size={16} />
            </a>
            <a className="text-link" href={`mailto:${profile.email}`}>
              {t.contact}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>
        <motion.div
          className="engineering-sculpture"
          aria-hidden="true"
          initial={isStatic ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25 }}
        >
          <div className="sculpture-halo" />
          <div className="sculpture-axis axis-one" />
          <div className="sculpture-axis axis-two" />
          <div className="sculpture-core">
            <div className="core-face face-front">
              <Code2 />
              <span>Frontend</span>
              <small>INTERFACE / EXPERIENCE</small>
            </div>
            <div className="core-face face-back">
              <Database />
              <span>Backend</span>
              <small>LOGIC / DATA / SERVICES</small>
            </div>
            <div className="core-bridge">
              <span />
              <Braces />
              <span />
            </div>
          </div>
          <div className="sculpture-caption">
            <Sparkles size={15} />
            <span>AI-AUGMENTED ENGINEERING</span>
          </div>
          <div className="sculpture-coordinate">
            [ INTERFACE ↔ SYSTEM ]<br />
            HUMAN JUDGMENT AT THE CORE
          </div>
        </motion.div>
      </div>
      <div className="hero-v2-bottom">
        <div className="experience-v2">
          <strong>{String(years).padStart(2, '0')}</strong>
          <span>
            {t.years}
            <small>Senior / Full-Stack</small>
          </span>
        </div>
        <div className="equal-expertise">
          <span>Frontend</span>
          <i>↔</i>
          <span>Backend</span>
          <small>
            {locale === 'fr' ? 'Une même profondeur technique.' : 'Equal engineering depth.'}
          </small>
        </div>
        <a className="hero-scroll" href="#about">
          <span>{t.scroll}</span>
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
}
