export type Locale = 'fr' | 'en';
export type Localized = Record<Locale, string>;
export const profile = { name: 'Rémi Tilmant', github: 'https://github.com/Towrowrow', linkedin: '', email: '', careerStart: null as string | null, initialExperience: 7 };
export function yearsOfExperience(start: string | null, fallback: number, now = new Date()): number {
  if (!start) return fallback;
  const date = new Date(start);
  if (Number.isNaN(date.getTime())) return fallback;
  const anniversaryPassed = now.getMonth() > date.getMonth() || (now.getMonth() === date.getMonth() && now.getDate() >= date.getDate());
  return Math.max(0, now.getFullYear() - date.getFullYear() - (anniversaryPassed ? 0 : 1));
}
