import type { TranslationShape } from './types';

const fr = {
  decisionLabel: 'ENGINEERING DECISIONS / 02',
  decisionTitle: 'Où placer\nla complexité ?',
  decisionIntro:
    'Même besoin. Deux architectures. Changez une frontière, puis observez les conséquences.',
  concept: 'EXEMPLE CONCEPTUEL · AUCUN SYSTÈME RÉEL',
  modes: {
    modular: 'Monolithe modulaire',
    services: 'Services séparés',
  },
  eventLabel: 'Événement à examiner',
  events: {
    healthy: 'Fonctionnement nominal',
    crash: 'Arrêt du processus Notifications',
    contract: 'Évolution du contrat Notifications',
  },
  queue: 'Notifications asynchrones',
  queueHint: 'Option des services séparés',
  units: {
    modular: 'UNE UNITÉ DE DÉPLOIEMENT',
    services: 'TROIS UNITÉS DE DÉPLOIEMENT',
  },
  nodes: {
    requests: 'Demandes',
    documents: 'Documents',
    notifications: 'Notifications',
  },
  nodeRoles: {
    requests: 'Émet une intention',
    documents: 'Prépare le contenu',
    notifications: 'Distribue le message',
  },
  statuses: {
    available: 'Disponible',
    stopped: 'Processus arrêté',
    waiting: 'Parcours en attente',
    changing: 'Contrat à coordonner',
  },
  localCall: 'appel local →',
  networkCall: 'appel réseau →',
  queuedEvent: 'événement en attente →',
  changingContract: 'contrat v1 / v2 →',
  changingTypes: 'vérification des types →',
  process: {
    modular: 'PROCESSUS COMMUN',
    services: 'PROCESSUS DISTINCTS',
  },
  storage: {
    modular: 'Modules distincts / stockage commun',
    services: 'Stockage propre à chaque service',
  },
  consequenceLabels: {
    failure: 'FRONTIÈRE DE PANNE',
    contracts: 'CONTRATS',
    delivery: 'LIVRAISON',
  },
  consequences: {
    sharedProcess: 'Un processus partagé',
    queueRecovery: 'Isolation + reprise de file',
    networkDependencies: 'Isolation, mais dépendances réseau',
    internalInterfaces: 'Interfaces internes',
    versionedEvents: 'Événements versionnés',
    networkContracts: 'Contrats réseau compatibles',
    coordinatedRelease: 'Un déploiement coordonné',
    separateReleases: 'Livraisons distinctes à coordonner',
  },
  outcomes: {
    modularHealthy:
      'Les trois modules évoluent dans un même processus. Le déploiement et la reprise sont communs.',
    servicesHealthy:
      'Les frontières permettent des livraisons indépendantes. Les échanges traversent désormais le réseau.',
    modularCrash:
      'Un arrêt fatal touche le processus commun : les trois modules sont indisponibles jusqu’à sa reprise.',
    servicesCrash:
      'Les processus sont séparés, mais ce parcours dépend d’appels synchrones. L’absence de Notifications bloque sa réponse de bout en bout.',
    queuedCrash:
      'Demandes et Documents peuvent terminer leur travail. La notification reste en attente ; il faut prévoir sa reprise et éviter les doublons.',
    modularContract:
      'Les appels et les types peuvent être vérifiés ensemble avant une livraison coordonnée. Les frontières entre modules restent à protéger.',
    servicesContract:
      'Une nouvelle version du contrat doit rester compatible avec les consommateurs encore déployés. Versionner ou migrer devient un travail explicite.',
  },
  assumptions: 'Ce que cette représentation suppose',
  assumptionsText:
    'Le scénario considère un arrêt fatal du processus, pas une exception récupérable. Les services synchrones forment une chaîne d’appels ; une file permet de différer uniquement la notification. Chaque service est responsable de ses données : les autres passent par son API ou ses événements, sans lire ni modifier directement ses tables. Cela n’impose pas un serveur de base de données physique distinct par service. Cette illustration ne mesure ni disponibilité ni performance réelles. Aucun choix n’est universellement meilleur.',
} as const;

const en = {
  decisionLabel: 'ENGINEERING DECISIONS / 02',
  decisionTitle: 'Where should\ncomplexity live?',
  decisionIntro: 'One need. Two architectures. Change a boundary, then explore the consequences.',
  concept: 'CONCEPTUAL EXAMPLE · NOT A REAL SYSTEM',
  modes: {
    modular: 'Modular monolith',
    services: 'Separate services',
  },
  eventLabel: 'Event to explore',
  events: {
    healthy: 'Normal operation',
    crash: 'Notifications process stops',
    contract: 'Notifications contract changes',
  },
  queue: 'Asynchronous notifications',
  queueHint: 'Available with separate services',
  units: {
    modular: 'ONE DEPLOYMENT UNIT',
    services: 'THREE DEPLOYMENT UNITS',
  },
  nodes: {
    requests: 'Requests',
    documents: 'Documents',
    notifications: 'Notifications',
  },
  nodeRoles: {
    requests: 'Expresses an intent',
    documents: 'Prepares the content',
    notifications: 'Delivers the message',
  },
  statuses: {
    available: 'Available',
    stopped: 'Process stopped',
    waiting: 'Journey waiting',
    changing: 'Contract to coordinate',
  },
  localCall: 'local call →',
  networkCall: 'network call →',
  queuedEvent: 'event waiting →',
  changingContract: 'v1 / v2 contract →',
  changingTypes: 'type checking →',
  process: {
    modular: 'SHARED PROCESS',
    services: 'SEPARATE PROCESSES',
  },
  storage: {
    modular: 'Separate modules / shared storage',
    services: 'Storage owned by each service',
  },
  consequenceLabels: {
    failure: 'FAILURE BOUNDARY',
    contracts: 'CONTRACTS',
    delivery: 'DELIVERY',
  },
  consequences: {
    sharedProcess: 'One shared process',
    queueRecovery: 'Isolation + queue recovery',
    networkDependencies: 'Isolation with network dependencies',
    internalInterfaces: 'Internal interfaces',
    versionedEvents: 'Versioned events',
    networkContracts: 'Compatible network contracts',
    coordinatedRelease: 'One coordinated deployment',
    separateReleases: 'Separate releases to coordinate',
  },
  outcomes: {
    modularHealthy: 'The three modules share a process. Deployment and recovery happen together.',
    servicesHealthy:
      'Boundaries allow independent releases. Communication now crosses the network.',
    modularCrash:
      'A fatal stop takes down the shared process: all three modules are unavailable until it recovers.',
    servicesCrash:
      'Processes are separate, but this journey uses synchronous calls. The missing Notifications service blocks its end-to-end response.',
    queuedCrash:
      'Requests and Documents can finish their work. The notification waits; recovery and duplicate prevention still need to be designed.',
    modularContract:
      'Calls and types can be checked together before a coordinated release. Module boundaries still need protection.',
    servicesContract:
      'A new contract must remain compatible with consumers still running older versions. Versioning or migration becomes explicit work.',
  },
  assumptions: 'Assumptions behind this model',
  assumptionsText:
    'The scenario models a fatal process stop, not a recoverable exception. Synchronous services form a chain of calls; a queue only defers the notification. Each service owns its data: other services use its API or events rather than reading or changing its tables directly. This does not require a separate physical database server for each service. This illustration does not measure real availability or performance. Neither option is universally better.',
} as const satisfies TranslationShape<typeof fr>;

export const decisionsMessages = { fr, en };
export type DecisionsMessages = TranslationShape<typeof fr>;
