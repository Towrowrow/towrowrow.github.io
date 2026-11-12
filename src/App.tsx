import './styles/global.css';
import './styles/hero.css';
import './styles/architecture.css';
import './styles/sections.css';
import './styles/labs.css';
import './styles/lab-stories.css';

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';
import { Component, useEffect, useState } from 'react';

import { ArchitectureExplorer } from './components/ArchitectureExplorer';
import { BehindTheBuild, ContactSection } from './components/BuildContact';
import { CinematicHero } from './components/CinematicHero';
import { ExpertiseSection } from './components/ExpertiseSection';
import { PersonalSection } from './components/PersonalSection';
import { SiteFooter, SiteHeader } from './components/SiteChrome';
import type { Locale } from './data/profile';
import { profile, yearsOfExperience } from './data/profile';
import { seoFor } from './data/seo';
import { AIEngineeringLab } from './features/ai-engineering-lab/AIEngineeringLab';
import { EngineeringDecisions } from './features/engineering-decisions/EngineeringDecisions';
import { RequestPlayground } from './features/request-playground/RequestPlayground';
import { siteMessages } from './i18n/site';
function initialLocale(): Locale {
  return typeof window !== 'undefined' && window.location.pathname.startsWith('/en/') ? 'en' : 'fr';
}
export function App({ initialLanguage }: { initialLanguage?: Locale }) {
  const [locale] = useState<Locale>(initialLanguage ?? initialLocale);
  const years = yearsOfExperience(profile.careerStart, profile.initialExperience);
  useEffect(() => {
    const seo = seoFor(locale);
    document.documentElement.lang = locale;
    document.title = seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
  }, [locale]);
  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader locale={locale} />
      <main id="main">
        <CinematicHero locale={locale} years={years} />
        <PersonalSection locale={locale} years={years} />
        <EngineeringDecisions locale={locale} />
        <ExpertiseSection locale={locale} />
        <section id="architecture" className="architecture-section-new">
          <div className="wrap">
            <ArchitectureExplorer locale={locale} />
          </div>
        </section>
        <RequestPlayground locale={locale} />
        <AIEngineeringLab locale={locale} />
        <BehindTheBuild locale={locale} />
        <ContactSection locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </MotionConfig>
  );
}
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    const t = siteMessages[initialLocale()].hero;
    return this.state.failed ? (
      <main className="wrap error-page">
        <h1>{t.error}</h1>
        <button className="button primary" onClick={() => location.reload()}>
          {t.retry}
        </button>
      </main>
    ) : (
      this.props.children
    );
  }
}
