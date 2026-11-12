import type { Locale } from '../../data/profile';
import type { AgentsMessages } from '../../i18n/agents';
import { agentsMessages } from '../../i18n/agents.ts';
import { labStories } from '../../i18n/labStories.ts';
import type { AgentState } from '../../labs/agentMachine';
import { graphRoles, isHumanGate } from '../../labs/agentMachine.ts';

export function agentStoryMessages(locale: Locale): AgentsMessages {
  const story = labStories[locale].agents;
  return {
    ...agentsMessages[locale],
    agentTitle: story.title,
    agentIntro: story.intro,
    agentScenarios: story.scenarios,
    roleCaptions: story.roleLabels,
    previous: story.previous,
    diagnose: story.diagnose,
    returnDev: story.returnDev,
    humanBefore: story.humanBefore,
    humanGate: story.humanReady,
    humanChecks: story.checks,
    revise: story.revise,
    accept: story.accept,
    accepted: story.accepted,
  };
}
export function agentLesson(state: AgentState, locale: Locale) {
  const story = labStories[locale].agents;
  const base = story.roles[state.selected];
  if (state.selected === 'tester' && state.scenario === 'regression') {
    if (state.corrected) return { ...base, title: story.correctedTitle, body: story.correctedBody };
    return { ...base, title: story.failedTitle, body: story.failedBody };
  }
  return base;
}
export function humanLesson(state: AgentState, locale: Locale) {
  const story = labStories[locale].agents;
  if (state.accepted) return story.accepted;
  if (!isHumanGate(state)) return story.humanBefore;
  if (!graphRoles.every((role) => state.visited.includes(role))) return story.humanMissing;
  if (state.scenario === 'regression' && (!state.diagnosed || !state.corrected))
    return story.humanUnresolved;
  return story.humanReady;
}
