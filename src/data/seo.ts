import type { Locale } from './profile';
import { profile, yearsOfExperience } from './profile';

export const siteUrl = 'https://towrowrow.github.io/';
export const languageUrl = (locale: Locale) => (locale === 'en' ? `${siteUrl}en/` : siteUrl);
export function seoFor(locale: Locale) {
  const years = yearsOfExperience(profile.careerStart, profile.initialExperience);
  return {
    title:
      locale === 'fr'
        ? 'Rémi Tilmant — Développeur Full-Stack Senior / Lead Developer'
        : 'Rémi Tilmant — Senior Full-Stack Engineer / Lead Developer',
    description:
      locale === 'fr'
        ? `Rémi Tilmant, développeur Full-Stack Senior / Lead Developer. ${years} ans d’expérience : React, TypeScript, Node.js, Go, architecture logicielle et agents IA.`
        : `Rémi Tilmant, Senior Full-Stack Engineer / Lead Developer. ${years} years of experience: React, TypeScript, Node.js, Go, software architecture and AI agents.`,
    url: languageUrl(locale),
    ogLocale: locale === 'fr' ? 'fr_FR' : 'en_US',
  };
}
export function personSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}#person`,
    name: profile.name,
    url: siteUrl,
    jobTitle:
      locale === 'fr'
        ? 'Développeur Full-Stack Senior / Lead Developer'
        : 'Senior Full-Stack Engineer / Lead Developer',
    description: seoFor(locale).description,
    email: `mailto:${profile.email}`,
    sameAs: [profile.github],
    knowsAbout: [
      'React',
      'TypeScript',
      'Node.js',
      'Go',
      'Software architecture',
      'AI-Augmented Software Engineering',
      'AI agents',
    ],
  };
}
