export type Locale = 'fr' | 'en';
export type Localized = Record<Locale, string>;
interface Profile {
  name: string;
  github: string;
  linkedin: string;
  cv: string;
  email: string;
  careerStart: string | null;
  initialExperience: number;
}

export const profile: Profile = {
  name: 'Rémi Tilmant',
  github: 'https://github.com/Towrowrow',
  linkedin: 'https://www.linkedin.com/in/rémi-tilmant/',
  cv: '',
  email: 'towtowrow@gmail.com',
  careerStart: null,
  initialExperience: 7,
};
export function yearsOfExperience(
  start: string | null,
  fallback: number,
  now = new Date(),
): number {
  if (!start) return fallback;
  const date = new Date(start);
  if (Number.isNaN(date.getTime())) return fallback;
  const anniversaryPassed =
    now.getMonth() > date.getMonth() ||
    (now.getMonth() === date.getMonth() && now.getDate() >= date.getDate());
  return Math.max(0, now.getFullYear() - date.getFullYear() - (anniversaryPassed ? 0 : 1));
}
