import type { DecisionsMessages } from '../../i18n/decisions';
import type { ArchitectureEvent, ArchitectureModel, NodeStatus } from '../../labs/architecture';

const nodeClasses: Record<NodeStatus, string> = {
  available: '',
  stopped: 'failed',
  waiting: 'waiting',
  changing: 'waiting',
};
export function nodeClass(status: NodeStatus) {
  return nodeClasses[status];
}

export function decisionConsequences(model: ArchitectureModel, t: DecisionsMessages) {
  const { consequences: text, consequenceLabels: labels } = t;
  if (!model.distributed) {
    return [
      { label: labels.failure, text: text.sharedProcess },
      { label: labels.contracts, text: text.internalInterfaces },
      { label: labels.delivery, text: text.coordinatedRelease },
    ];
  }
  return [
    { label: labels.failure, text: model.queued ? text.queueRecovery : text.networkDependencies },
    { label: labels.contracts, text: model.queued ? text.versionedEvents : text.networkContracts },
    { label: labels.delivery, text: text.separateReleases },
  ];
}

export function connectionView(
  isNotificationBoundary: boolean,
  model: ArchitectureModel,
  event: ArchitectureEvent,
  t: DecisionsMessages,
) {
  let className = '';
  if (model.blocked) className = 'blocked';
  else if (isNotificationBoundary && (model.queued || event === 'contract')) className = 'queued';

  let label = model.distributed ? t.networkCall : t.localCall;
  if (isNotificationBoundary && event === 'contract') {
    label = model.distributed ? t.changingContract : t.changingTypes;
  } else if (isNotificationBoundary && model.queued && event === 'crash') {
    label = t.queuedEvent;
  }
  return { className, label };
}
