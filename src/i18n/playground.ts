import type { TranslationShape } from './types';

const fr = {
  playgroundLabel: 'ENGINEERING PLAYGROUND / 05',
  playgroundTitle: 'Une intention.\nPlusieurs vérités.',
  playgroundIntro:
    'Explorer une sauvegarde optimiste, un contrat et les réponses qui arrivent trop tard.',
  localSimulation: 'SIMULATEUR LOCAL / AUCUN APPEL RÉSEAU',
  scenarioLabel: 'Situation à explorer',
  requestScenarios: {
    success: 'Sauvegarde acceptée',
    validation: 'Contrat refusé · 422',
    conflict: 'Conflit de version · 409',
    offline: 'Transport indisponible',
    race: 'Deux réponses dans le désordre',
  },
  reset: 'Reprendre le scénario',
  document: 'DOCUMENT D’EXEMPLE',
  documentTitle: 'Documenter les frontières.',
  raceTitle: 'Architecture documentée.',
  synthetic: 'Les données et les versions de ce document sont synthétiques.',
  priority: 'Priorité',
  normal: 'Normal',
  high: 'Haute',
  provisional: 'provisoire',
  edit: 'Passer en priorité haute',
  undo: 'Revenir à la priorité normale',
  projectionLabel: 'CE QUE L’INTERFACE MONTRE',
  send: 'Enregistrer la modification',
  deliver: 'Livrer la réponse simulée',
  deliverB: 'Livrer d’abord la réponse B',
  deliverA: 'Livrer ensuite la réponse A',
  protocol: 'LE CYCLE DE LA REQUÊTE',
  simulatedEvents: 'Événements simulés',
  trace: {
    intent: 'INTENTION',
    projection: 'PROJECTION',
    response: 'RÉPONSE',
    reconciliation: 'RÉCONCILIATION',
  },
  traceDetails: {
    intent: 'Une modification locale attend sa sauvegarde.',
    projection: 'La valeur provisoire reste distincte de la confirmation.',
    response: 'Le contrat, la version et le transport sont examinés.',
    reconciliation: 'Confirmer, corriger, restaurer ou ignorer.',
  },
  lastConfirmed: 'DERNIER ÉTAT CONFIRMÉ',
  resolve: 'Choisir une résolution explicite.',
  reload: 'Charger la version confirmée',
  reapply: 'Réappliquer sur la révision 8',
  retry: 'Rétablir le transport et réessayer',
  inspectContract: 'Examiner le contrat et les réponses obsolètes',
  contractNote:
    'Contrat pédagogique. Aucun serveur Node.js ou Go n’est exécuté. La tentative réutilise la même intention ; elle ne doit pas créer de doublon.',
  requestPhases: {
    reloaded: {
      status: 'Version confirmée chargée',
      projection: 'Projection locale abandonnée',
      title: 'La version confirmée remplace la modification locale.',
      description:
        'Aucune nouvelle écriture : la révision 8 est chargée et la projection est abandonnée.',
    },
    draft: {
      status: 'Brouillon local',
      projection: 'Version confirmée',
      title: 'Une modification peut être projetée avant sa confirmation.',
      description: 'La valeur affichée et la valeur confirmée restent distinguées.',
    },
    pending: {
      status: 'Sauvegarde en attente',
      projection: 'Projection optimiste · confirmation attendue',
      title: 'Affiché ne signifie pas confirmé.',
      description:
        'L’état confirmé n’a pas encore changé. Une erreur doit pouvoir réconcilier les deux états.',
    },
    'b-confirmed': {
      status: 'B confirmée · A en transit',
      projection: 'Réponse B confirmée',
      title: 'La réponse B peut être appliquée.',
      description:
        'La réponse A reste en transit. Livrez-la pour vérifier qu’elle ne remplace pas l’état courant.',
    },
    accepted: {
      status: 'Confirmé',
      projection: 'Version confirmée',
      title: 'La projection et l’état confirmé sont réconciliés.',
      description: 'La réponse correspond à l’intention attendue et la révision est explicite.',
    },
    invalid: {
      status: 'Contrat refusé · 422',
      projection: 'État confirmé conservé',
      title: 'Erreur de contrat : restaurer la projection.',
      description:
        'Le scénario injecte « urgentissime » dans la requête. Cette valeur est refusée ; l’erreur est reliée au champ priority.',
    },
    conflict: {
      status: 'Conflit · résolution requise',
      projection: 'Projection locale non confirmée',
      title: 'Ne pas écraser silencieusement une version plus récente.',
      description:
        'La modification reste distincte : charger la version confirmée ou réappliquer sur sa nouvelle révision.',
    },
    offline: {
      status: 'Transport indisponible',
      projection: 'Modification locale non confirmée',
      title: 'Une absence de réponse n’est pas une preuve de refus.',
      description:
        'Conserver l’intention, puis rétablir le transport pour une tentative sans doublon.',
    },
    'stale-ignored': {
      status: 'Dernière intention conservée',
      projection: 'Réponse A obsolète ignorée',
      title: 'Une ancienne réponse n’écrase pas la plus récente.',
      description: 'Le document reste « Architecture documentée », confirmé par B.',
    },
  },
  revision: 'révision',
  raceIntent: 'Intentions A puis B : B est la plus récente.',
  contract:
    'PATCH /decisions/14 · If-Match: revision\npriority ∈ { normal, high }\n422 → contrat refusé / 409 → version incompatible\nintentId === latestRelevantIntent',
} as const;

const en = {
  playgroundLabel: 'ENGINEERING PLAYGROUND / 05',
  playgroundTitle: 'One intention.\nSeveral states of truth.',
  playgroundIntro: 'Explore an optimistic save, a contract and responses that arrive too late.',
  localSimulation: 'LOCAL SIMULATOR / NO NETWORK REQUESTS',
  scenarioLabel: 'Situation to explore',
  requestScenarios: {
    success: 'Save accepted',
    validation: 'Contract rejected · 422',
    conflict: 'Version conflict · 409',
    offline: 'Transport unavailable',
    race: 'Two responses out of order',
  },
  reset: 'Restart the scenario',
  document: 'EXAMPLE DOCUMENT',
  documentTitle: 'Document the boundaries.',
  raceTitle: 'Documented architecture.',
  synthetic: 'This document’s data and versions are synthetic.',
  priority: 'Priority',
  normal: 'Normal',
  high: 'High',
  provisional: 'provisional',
  edit: 'Change to high priority',
  undo: 'Return to normal priority',
  projectionLabel: 'WHAT THE INTERFACE SHOWS',
  send: 'Save the change',
  deliver: 'Deliver the simulated response',
  deliverB: 'Deliver response B first',
  deliverA: 'Deliver response A next',
  protocol: 'THE REQUEST LIFECYCLE',
  simulatedEvents: 'Simulated events',
  trace: {
    intent: 'INTENT',
    projection: 'PROJECTION',
    response: 'RESPONSE',
    reconciliation: 'RECONCILIATION',
  },
  traceDetails: {
    intent: 'A local change is waiting to be saved.',
    projection: 'The provisional value remains distinct from confirmation.',
    response: 'The contract, version and transport are examined.',
    reconciliation: 'Confirm, correct, restore or ignore.',
  },
  lastConfirmed: 'LAST CONFIRMED STATE',
  resolve: 'Choose an explicit resolution.',
  reload: 'Load the confirmed version',
  reapply: 'Reapply on revision 8',
  retry: 'Restore transport and retry',
  inspectContract: 'Inspect the contract and stale-response protection',
  contractNote:
    'Educational contract. No Node.js or Go server is running. A retry keeps the same intent and must not create a duplicate.',
  requestPhases: {
    reloaded: {
      status: 'Confirmed version loaded',
      projection: 'Local projection discarded',
      title: 'The confirmed version replaces the local change.',
      description: 'No new write: revision 8 is loaded and the local projection is discarded.',
    },
    draft: {
      status: 'Local draft',
      projection: 'Confirmed version',
      title: 'A change can be projected before it is confirmed.',
      description: 'The displayed and confirmed values remain distinct.',
    },
    pending: {
      status: 'Save pending',
      projection: 'Optimistic projection · waiting for confirmation',
      title: 'Displayed does not mean confirmed.',
      description: 'The confirmed state has not changed yet. Errors must reconcile the two states.',
    },
    'b-confirmed': {
      status: 'B confirmed · A in transit',
      projection: 'Response B confirmed',
      title: 'Response B can be applied.',
      description:
        'Response A is still in transit. Deliver it to check that it cannot replace the current state.',
    },
    accepted: {
      status: 'Confirmed',
      projection: 'Confirmed version',
      title: 'The projection and confirmed state are reconciled.',
      description: 'The response matches the expected intent and its revision is explicit.',
    },
    invalid: {
      status: 'Contract rejected · 422',
      projection: 'Confirmed state preserved',
      title: 'Contract error: restore the projection.',
      description:
        'The scenario injects “urgentissime” into the request. This value is rejected and the error is linked to priority.',
    },
    conflict: {
      status: 'Conflict · resolution required',
      projection: 'Local projection not confirmed',
      title: 'Do not silently overwrite a newer version.',
      description:
        'Keep the change separate: load the confirmed version or reapply on its new revision.',
    },
    offline: {
      status: 'Transport unavailable',
      projection: 'Local change not confirmed',
      title: 'No response is not proof of rejection.',
      description: 'Keep the intent, then restore transport for a retry without duplicates.',
    },
    'stale-ignored': {
      status: 'Latest intent preserved',
      projection: 'Stale response A ignored',
      title: 'An older response does not overwrite the newest one.',
      description: 'The document remains “Documented architecture”, confirmed by B.',
    },
  },
  revision: 'revision',
  raceIntent: 'Intents A then B: B is the newest.',
  contract:
    'PATCH /decisions/14 · If-Match: revision\npriority ∈ { normal, high }\n422 → contract rejected / 409 → version conflict\nintentId === latestRelevantIntent',
} as const satisfies TranslationShape<typeof fr>;

export const playgroundMessages = { fr, en };
export type PlaygroundMessages = TranslationShape<typeof fr>;
