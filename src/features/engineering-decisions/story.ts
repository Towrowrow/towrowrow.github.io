import type { Locale } from '../../data/profile';
import type { DecisionsMessages } from '../../i18n/decisions';
import { decisionsMessages } from '../../i18n/decisions.ts';
import { labStories } from '../../i18n/labStories.ts';

/** Human-facing labels keep exactly the same architecture model and outcomes. */
export function decisionStoryMessages(locale: Locale): DecisionsMessages {
  const story = labStories[locale].decisions;
  return {
    ...decisionsMessages[locale],
    ...story,
    decisionTitle: story.title,
    decisionIntro: story.intro,
  };
}
