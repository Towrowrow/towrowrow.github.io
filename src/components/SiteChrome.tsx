import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useRef, useState } from 'react';

import type { Locale } from '../data/profile';
import { profile } from '../data/profile';
import { siteMessages } from '../i18n/site';
const targets = ['expertise', 'decisions', 'playground', 'build'] as const;
export function SiteHeader({ locale }: { locale: Locale }) {
  const t = siteMessages[locale];
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <header
        className="header"
        onKeyDown={(event) => {
          if (event.key === 'Escape' && open) {
            setOpen(false);
            menuRef.current?.focus();
          }
        }}
      >
        <a
          className="wordmark"
          href="#"
          aria-label={`${profile.name} — ${locale === 'fr' ? 'accueil' : 'home'}`}
        >
          {profile.name}
          <span>.</span>
        </a>
        <nav
          id="site-navigation"
          className={open ? 'nav open' : 'nav'}
          aria-label={locale === 'fr' ? 'Navigation principale' : 'Main navigation'}
        >
          {targets.map((target) => (
            <a href={`#${target}`} key={target} onClick={() => setOpen(false)}>
              {t.nav[target]}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="language"
            href={locale === 'fr' ? '/en/' : '/'}
            hrefLang={locale === 'fr' ? 'en' : 'fr'}
            aria-label={
              locale === 'fr' ? 'FR / EN — Switch to English' : 'FR / EN — Passer en français'
            }
          >
            <span className={locale === 'fr' ? 'active' : ''}>FR</span>
            <span>/</span>
            <span className={locale === 'en' ? 'active' : ''}>EN</span>
          </a>
          <a className="contact-link" href={`mailto:${profile.email}`}>
            {t.talk}
            <ArrowUpRight size={14} />
          </a>
          <button
            ref={menuRef}
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="site-navigation"
            aria-label={t.menu}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="wrap footer">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <span>Full-Stack / Architecture / AI-Augmented Engineering</span>
      <a href="#" aria-label={siteMessages[locale].back}>
        <ArrowUpRight size={20} />
      </a>
    </footer>
  );
}
