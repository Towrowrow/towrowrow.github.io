import type { Locale } from '../../data/profile';
import { labStories } from '../../i18n/labStories.ts';
import type { RequestState } from '../../labs/requestMachine';

/** Explain the current interaction without creating another simulation state. */
export function requestLesson(state: RequestState, locale: Locale) {
  const messages = labStories[locale].playground;
  const phase = state.phase === 'draft' && state.dirty ? 'edited' : state.phase;
  const text = messages.phases[phase];
  let step = 2;
  if (state.phase === 'draft') step = state.dirty ? 1 : 0;
  let receive: string = messages.receive;
  if (state.scenario === 'race') receive = messages.receiveB;
  if (state.phase === 'b-confirmed') receive = messages.receiveA;
  return {
    ...text,
    step,
    receive,
    complete: ['accepted', 'reloaded', 'invalid', 'stale-ignored'].includes(state.phase),
  };
}
export type RequestLesson = ReturnType<typeof requestLesson>;
