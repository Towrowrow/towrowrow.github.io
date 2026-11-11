import { ArrowUpRight, FileDown, Github, Linkedin } from 'lucide-react';

import type { Locale } from '../data/profile';
import { profile } from '../data/profile';
import { siteMessages } from '../i18n/site';
export function BehindTheBuild({ locale }: { locale: Locale }) {
  const t = siteMessages[locale];
  return (
    <section id="build" className="build-section">
      <div className="wrap">
        <div className="build-heading">
          <p className="eyebrow">{t.buildLabel}</p>
          <span>{t.realProject}</span>
        </div>
        <h2>{t.buildTitle}</h2>
        <div className="build-layout">
          <div className="build-manifest">
            <p>{t.buildText}</p>
            <p>{t.buildTruth}</p>
            <a
              href="https://github.com/Towrowrow/towrowrow.github.io"
              target="_blank"
              rel="noreferrer"
            >
              {t.code}
              <ArrowUpRight size={16} />
            </a>
          </div>
          <ol className="build-blueprint">
            {t.buildSteps.map((step) => (
              <li key={step[0]}>
                <span>{step[0]}</span>
                <strong>{step[1]}</strong>
                <small>{step[2]}</small>
              </li>
            ))}
          </ol>
        </div>
        <div className="build-note">
          <span>{t.realDecision}</span>
          <p>{t.realDecisionText}</p>
        </div>
      </div>
    </section>
  );
}
export function ContactSection({ locale }: { locale: Locale }) {
  const t = siteMessages[locale];
  return (
    <section id="contact" className="contact-new">
      <div className="wrap">
        <p className="eyebrow">{t.contactLabel}</p>
        <h2>{t.contactTitle}</h2>
        <div className="contact-paths">
          <div>
            <span>{t.recruitment}</span>
            <p>{t.recruitmentText}</p>
          </div>
          <div>
            <span>{t.mission}</span>
            <p>{t.missionText}</p>
          </div>
        </div>
        <a className="email-link" href={`mailto:${profile.email}`}>
          {profile.email}
          <ArrowUpRight aria-hidden="true" />
        </a>
        <div className="contact-secondary">
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github size={16} />
            GitHub
            <ArrowUpRight size={13} />
          </a>
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={16} />
              LinkedIn
              <ArrowUpRight size={13} />
            </a>
          )}
          {profile.cv && (
            <a href={profile.cv} download>
              <FileDown size={16} />
              {t.cv}
            </a>
          )}
          <span>Engineering software, somewhere beyond the Warp.</span>
        </div>
      </div>
    </section>
  );
}
