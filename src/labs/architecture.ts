export const architectureModes = ['modular', 'services'] as const;
export const architectureEvents = ['healthy', 'crash', 'contract'] as const;
export const architectureNodes = ['requests', 'documents', 'notifications'] as const;

export type ArchitectureMode = (typeof architectureModes)[number];
export type ArchitectureEvent = (typeof architectureEvents)[number];
export type ArchitectureNode = (typeof architectureNodes)[number];
export type NodeStatus = 'available' | 'stopped' | 'waiting' | 'changing';
export type ArchitectureOutcome =
  | 'modularHealthy'
  | 'servicesHealthy'
  | 'modularCrash'
  | 'servicesCrash'
  | 'queuedCrash'
  | 'modularContract'
  | 'servicesContract';

export interface ArchitectureModel {
  distributed: boolean;
  queued: boolean;
  statuses: Record<ArchitectureNode, NodeStatus>;
  outcome: ArchitectureOutcome;
  blocked: boolean;
}

/** A conceptual model: queueing decouples notification delivery, not every service. */
export function architectureModel(
  mode: ArchitectureMode,
  event: ArchitectureEvent,
  asynchronous: boolean,
): ArchitectureModel {
  const distributed = mode === 'services';
  const queued = distributed && asynchronous;
  const statuses: ArchitectureModel['statuses'] = {
    requests: 'available',
    documents: 'available',
    notifications: 'available',
  };
  let outcome: ArchitectureOutcome = distributed ? 'servicesHealthy' : 'modularHealthy';

  if (event === 'crash' && !distributed) {
    for (const node of architectureNodes) statuses[node] = 'stopped';
    outcome = 'modularCrash';
  } else if (event === 'crash') {
    statuses.notifications = 'stopped';
    if (!queued) {
      statuses.requests = 'waiting';
      statuses.documents = 'waiting';
    }
    outcome = queued ? 'queuedCrash' : 'servicesCrash';
  } else if (event === 'contract') {
    statuses.notifications = 'changing';
    outcome = distributed ? 'servicesContract' : 'modularContract';
  }

  return {
    distributed,
    queued,
    statuses,
    outcome,
    blocked: distributed && event === 'crash' && !queued,
  };
}
