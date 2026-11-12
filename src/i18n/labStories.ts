import type { TranslationShape } from './types';

const fr = {
  technical: 'Voir comment cela fonctionne techniquement',
  simulation: 'Démonstration locale · aucune donnée réelle',
  restart: 'Recommencer',
  playground: {
    title: 'Et si quelqu’un\nmodifiait avant vous ?',
    intro:
      'Vous modifiez un document partagé. L’application doit rester rapide sans perdre le travail de personne.',
    scenario: 'Choisissez ce qui arrive pendant l’enregistrement',
    scenarios: {
      success: 'Tout se passe bien',
      validation: 'Une modification est refusée',
      conflict: 'Quelqu’un a enregistré avant vous',
      offline: 'La connexion est coupée',
      race: 'Une ancienne réponse arrive en retard',
    },
    document: 'Votre document partagé',
    documentTitle: 'Préparer la prochaine version.',
    example: 'Exemple fictif, sans envoi de données.',
    priority: 'Priorité',
    normal: 'Normale',
    high: 'Haute',
    edit: 'Passer la priorité à Haute',
    undo: 'Annuler mon changement',
    save: 'Enregistrer mon changement',
    continue: 'Voir la prochaine étape',
    savedLabel: 'Ce qui est réellement enregistré',
    stages: ['Modifier', 'Enregistrer', 'Comprendre le résultat'],
    receive: 'Recevoir le résultat',
    receiveB: 'Recevoir la réponse la plus récente',
    receiveA: 'Recevoir aussi l’ancienne réponse',
    reload: 'Garder la version de l’autre personne',
    reapply: 'Enregistrer aussi mon changement',
    retry: 'Rétablir la connexion et réessayer',
    conclusion:
      'Une interface peut réagir tout de suite tout en protégeant les modifications et en annonçant honnêtement le résultat.',
    skills: 'React · TypeScript · gestion des états · concurrence · fiabilité des interfaces',
    phases: {
      draft: {
        title: 'À vous de modifier le document.',
        body: 'Passez la priorité à Haute. Vous verrez le changement avant même de l’enregistrer.',
        next: 'Commencez par le bouton dans le document.',
        status: 'Aucun changement en attente',
      },
      edited: {
        title: 'Votre changement apparaît immédiatement.',
        body: 'La priorité est maintenant Haute à l’écran, mais elle n’est pas encore enregistrée.',
        next: 'Enregistrez votre changement pour continuer.',
        status: 'Votre changement reste à enregistrer',
      },
      pending: {
        title: 'L’application essaie d’enregistrer.',
        body: 'Votre changement reste visible pendant l’attente. L’application n’annonce pas encore un succès.',
        next: 'Recevez le résultat pour découvrir ce qui se passe.',
        status: 'Enregistrement en cours',
      },
      conflict: {
        title: 'Quelqu’un a enregistré avant vous.',
        body: 'Votre changement est conservé à l’écran. Il ne peut pas être enregistré tel quel sans risquer d’effacer celui de l’autre personne.',
        next: 'Gardez sa version ou ajoutez votre changement à la nouvelle version.',
        status: 'Une décision est nécessaire',
      },
      offline: {
        title: 'La connexion a été coupée.',
        body: 'Votre changement reste à l’écran. Sans réponse, l’application ne peut pas vous assurer qu’il est enregistré.',
        next: 'Rétablissez la connexion pour tenter à nouveau, sans enregistrer deux fois le même changement.',
        status: 'Confirmation impossible pour le moment',
      },
      invalid: {
        title: 'Cette modification n’est pas acceptée.',
        body: 'Le scénario a envoyé une priorité inconnue. L’application explique le refus et rétablit la dernière valeur enregistrée.',
        next: 'Recommencez ou essayez une autre situation.',
        status: 'La dernière valeur enregistrée est préservée',
      },
      accepted: {
        title: 'Votre changement est bien enregistré.',
        body: 'L’affichage et le document enregistré indiquent maintenant la même priorité. Vous avez reçu une confirmation fiable.',
        next: 'Recommencez ou comparez une autre situation.',
        status: 'Changement enregistré',
      },
      reloaded: {
        title: 'Vous avez gardé la version de l’autre personne.',
        body: 'Votre changement local est abandonné, sans nouvel enregistrement. La priorité affichée correspond à sa version.',
        next: 'Vous pouvez recommencer pour essayer l’autre choix.',
        status: 'Version de l’autre personne chargée',
      },
      'b-confirmed': {
        title: 'Le changement le plus récent est enregistré.',
        body: 'Deux enregistrements se sont croisés. Le plus récent a déjà répondu ; une réponse plus ancienne est encore en route.',
        next: 'Recevez l’ancienne réponse pour voir si elle efface le résultat récent.',
        status: 'Dernier changement enregistré',
      },
      'stale-ignored': {
        title: 'L’ancienne réponse n’a rien effacé.',
        body: 'L’application a reconnu une réponse trop ancienne et l’a ignorée. Le changement le plus récent reste enregistré.',
        next: 'Recommencez ou comparez une autre situation.',
        status: 'Le résultat le plus récent est conservé',
      },
    },
  },
  decisions: {
    title: 'Une panne doit-elle\ntout arrêter ?',
    intro:
      'Votre application prépare un document, l’enregistre et prévient ses utilisateurs. Comparez ce qui arrive si l’envoi du message s’arrête.',
    tryFailure: 'Simuler la panne d’envoi',
    restore: 'Remettre l’envoi en marche',
    modeLabel: 'Deux façons d’organiser la même application',
    modes: {
      modular: 'Tout dans une même application',
      services: 'Des services séparés',
    },
    eventLabel: 'Ce qui se passe',
    events: {
      healthy: 'Tout fonctionne',
      crash: 'L’envoi des messages s’arrête',
      contract: 'Le service de messages est mis à jour',
    },
    queue: 'Envoyer le message plus tard',
    queueHint: 'Disponible avec des services séparés',
    units: {
      modular: 'LES TROIS TÂCHES FONCTIONNENT ENSEMBLE',
      services: 'LES TÂCHES PEUVENT FONCTIONNER SÉPARÉMENT',
    },
    nodes: {
      requests: 'La demande',
      documents: 'Le document',
      notifications: 'Le message',
    },
    nodeRoles: {
      requests: 'L’utilisateur demande un enregistrement',
      documents: 'L’application prépare son contenu',
      notifications: 'Les utilisateurs sont prévenus',
    },
    statuses: {
      available: 'Cette tâche peut continuer',
      stopped: 'Cette tâche est arrêtée',
      waiting: 'Cette tâche attend le message',
      changing: 'Cette tâche doit être adaptée',
    },
    process: {
      modular: 'Un fonctionnement commun',
      services: 'Des fonctionnements séparés',
    },
    storage: {
      modular: 'Les tâches partagent le même espace de travail',
      services: 'Chaque service garde ses propres données',
    },
    localCall: 'puis →',
    networkCall: 'attend →',
    queuedEvent: 'sera envoyé plus tard →',
    changingContract: 'à adapter →',
    changingTypes: 'à adapter ensemble →',
    outcomes: {
      modularHealthy:
        'Tout fonctionne : les trois tâches avancent ensemble. Simulez maintenant une panne pour voir ce qui les relie.',
      servicesHealthy:
        'Les tâches sont séparées. Mais si chacune attend la suivante, une panne peut encore bloquer le parcours : essayez la panne d’envoi.',
      modularCrash:
        'L’envoi s’est arrêté et toute l’application s’arrête avec lui. Comparez avec des services séparés : le résultat sera-t-il différent ?',
      servicesCrash:
        'Les services sont séparés, mais le document attend encore la réponse du service de messages. Essayez d’envoyer le message plus tard.',
      queuedCrash:
        'Le document peut être enregistré même si le message attend. En contrepartie, il faut organiser son envoi après la panne et éviter les doublons.',
      modularContract:
        'Le service de messages est mis à jour. Les tâches peuvent être adaptées et livrées ensemble ; il faut toujours garder leurs rôles bien séparés.',
      servicesContract:
        'Le service de messages est mis à jour. Les autres services doivent encore savoir lui parler : leurs mises à jour doivent rester compatibles.',
    },
    benefit:
      'Le bon choix dépend du besoin : permettre à l’utilisateur de continuer, sans oublier la reprise des tâches qui ont échoué.',
    skills: 'Architecture logicielle · gestion des pannes · contrats · déploiement',
  },
  architecture: {
    title: 'Que se passe-t-il\naprès votre clic ?',
    intro: 'Vous cliquez sur « Enregistrer ». Suivez votre demande jusqu’à sa confirmation.',
    next: 'Suivre la demande',
    again: 'Revoir le parcours',
    legend: 'Votre demande avance ; une confirmation revient vers votre écran.',
    benefit:
      'Des responsabilités claires permettent de faire évoluer une application sans fragiliser tout le parcours utilisateur.',
    skills: 'Conception Full-Stack · React · TypeScript · Node.js · Go · données',
    steps: [
      {
        name: 'Votre écran',
        title: 'Vous demandez à enregistrer.',
        body: 'L’interface montre votre document et transmet votre action. Elle doit aussi vous dire si l’enregistrement attend, réussit ou échoue.',
        why: 'Vous savez ce qui se passe, au lieu de cliquer sans retour.',
      },
      {
        name: 'La demande',
        title: 'L’application vérifie ce qui est demandé.',
        body: 'La demande est reçue et contrôlée : les informations nécessaires sont-elles présentes ? Une réponse claire est préparée si quelque chose manque.',
        why: 'Une erreur compréhensible vous aide à corriger votre action.',
      },
      {
        name: 'Le traitement',
        title: 'Les règles de l’application sont appliquées.',
        body: 'L’application décide comment enregistrer le document, en respectant ses règles et les actions qui doivent l’accompagner.',
        why: 'Le résultat reste cohérent, quel que soit l’écran utilisé.',
      },
      {
        name: 'La mémoire',
        title: 'Le document est conservé.',
        body: 'Les données sont enregistrées pour être retrouvées plus tard. Une confirmation peut alors revenir jusqu’à votre écran.',
        why: 'Vous retrouvez votre travail après avoir quitté la page.',
      },
    ],
  },
  agents: {
    title: 'Comment déléguer à l’IA\nsans perdre le contrôle ?',
    intro:
      'Explorez une proposition de travail, ses vérifications et votre décision finale. Tout est simulé localement.',
    scenarios: {
      endpoint: 'Ajouter une fonction à l’application',
      regression: 'Réparer une fonction qui ne marche plus',
      refactor: 'Améliorer le code sans rien casser',
    },
    situations: {
      endpoint:
        'L’application doit permettre d’enregistrer une note et expliquer ce qui manque si le titre est vide.',
      regression:
        'Une note sans titre provoque une erreur inattendue. Il faut la comprendre, la corriger et vérifier le résultat.',
      refactor:
        'Un composant devient difficile à maintenir. Son organisation doit changer, mais ses comportements doivent rester les mêmes.',
    },
    roleLabels: {
      architect: 'Définir le besoin',
      developer: 'Proposer le changement',
      tester: 'Vérifier le résultat',
      reviewer: 'Relire les risques',
    },
    next: [
      'Voir la proposition',
      'Vérifier la proposition',
      'Passer à la revue',
      'Prendre une décision',
      'Décision humaine',
    ],
    previous: 'Revenir à l’étape précédente',
    diagnose: 'Comprendre pourquoi cela échoue',
    returnDev: 'Confier la correction au Developer',
    roles: {
      architect: {
        title: 'On précise ce qui doit être construit.',
        body: 'La demande est transformée en critères concrets : ce qui doit fonctionner et ce qui doit être refusé.',
        why: 'Une demande claire évite de produire une solution qui passe à côté du besoin.',
      },
      developer: {
        title: 'Une modification ciblée est proposée.',
        body: 'Le changement doit répondre à la demande sans transformer inutilement le reste de l’application.',
        why: 'Un changement limité est plus facile à comprendre, vérifier et maintenir.',
      },
      tester: {
        title: 'On examine les situations qui comptent.',
        body: 'L’exemple présente ce qui doit se passer dans le cas normal et quand une information manque ou qu’une erreur survient.',
        why: 'Un résultat qui semble correct ne suffit pas : les cas difficiles doivent aussi être examinés.',
      },
      reviewer: {
        title: 'Un autre regard questionne la proposition.',
        body: 'La revue cherche les risques oubliés, les responsabilités inutiles et les comportements qui pourraient être abîmés.',
        why: 'Relire avant d’accepter réduit le risque de laisser passer une erreur évitable.',
      },
      orchestrator: {
        title: 'Le travail circule entre les rôles.',
        body: 'La coordination transmet le besoin et les propositions, puis dirige les échecs vers une correction.',
        why: 'Coordonner les assistants ne remplace pas l’examen de leurs résultats par une personne.',
      },
      debugger: {
        title: 'On cherche la cause avant de corriger.',
        body: 'L’exemple fautif est isolé pour comprendre pourquoi la réponse attendue n’arrive pas.',
        why: 'Une correction fondée sur la cause évite de masquer seulement le symptôme.',
      },
      documentation: {
        title: 'Les choix restent compréhensibles après coup.',
        body: 'La documentation conserve ce qui change, pourquoi, et les limites qu’il faudra connaître pour faire évoluer le logiciel.',
        why: 'Le travail peut être repris sans devoir deviner les intentions de son auteur.',
      },
      human: {
        title: 'Le dernier choix vous appartient.',
        body: 'Examinez les propositions et les vérifications, puis acceptez ou demandez une nouvelle version.',
        why: 'La responsabilité ne disparaît pas parce que des assistants ont participé.',
      },
    },
    failedTitle: 'Un exemple ne donne pas le résultat attendu.',
    failedBody:
      'Une note sans titre provoque une erreur au lieu d’expliquer ce qui manque. Explorez le diagnostic avant de poursuivre.',
    correctedTitle: 'L’exemple qui échouait a été repris.',
    correctedBody:
      'La correction proposée demande maintenant le titre manquant. Le cas normal doit aussi être relu avant votre décision.',
    humanBefore:
      'Parcourez le besoin, la proposition, les vérifications et la revue. Vous pourrez ensuite prendre une décision.',
    humanMissing:
      'Il reste des rôles à explorer. Revenez sur les étapes non parcourues avant de valider.',
    humanUnresolved:
      'Le problème du scénario n’a pas encore été corrigé. Revenez au Tester, puis suivez le diagnostic et la correction.',
    humanReady:
      'Vous avez parcouru les propositions. Confirmez leur lecture, puis acceptez ou demandez une révision.',
    checks: {
      criteria: 'J’ai relu ce qui était demandé',
      evidence: 'J’ai examiné les exemples de vérification',
    },
    revise: 'Demander une autre proposition',
    accept: 'Accepter la proposition simulée',
    accepted: 'Vous avez accepté la proposition dans cette simulation.',
    benefit:
      'Des assistants peuvent accélérer le travail ; des critères clairs, des vérifications et une décision humaine aident à en préserver la qualité.',
    skills: 'Orchestration d’agents · cadrage · tests · revue · jugement technique',
  },
} as const;

const en = {
  technical: 'See how it works technically',
  simulation: 'Local demonstration · no real data',
  restart: 'Start again',
  playground: {
    title: 'What if someone else\nchanged it first?',
    intro:
      'You are editing a shared document. The application should stay responsive without losing anyone’s work.',
    scenario: 'Choose what happens while saving',
    scenarios: {
      success: 'Everything goes well',
      validation: 'A change is rejected',
      conflict: 'Someone saved before you',
      offline: 'The connection drops',
      race: 'An older response arrives late',
    },
    document: 'Your shared document',
    documentTitle: 'Prepare the next release.',
    example: 'Fictional example. No data is sent.',
    priority: 'Priority',
    normal: 'Normal',
    high: 'High',
    edit: 'Change priority to High',
    undo: 'Undo my change',
    save: 'Save my change',
    continue: 'See the next step',
    savedLabel: 'What is actually saved',
    stages: ['Make a change', 'Save it', 'Understand the result'],
    receive: 'Receive the result',
    receiveB: 'Receive the newest response',
    receiveA: 'Receive the older response too',
    reload: 'Keep the other person’s version',
    reapply: 'Save my change as well',
    retry: 'Restore the connection and retry',
    conclusion:
      'An interface can react immediately while protecting changes and being honest about what was saved.',
    skills: 'React · TypeScript · state management · concurrency · reliable interfaces',
    phases: {
      draft: {
        title: 'Your turn to edit the document.',
        body: 'Change the priority to High. You will see the change before saving it.',
        next: 'Start with the button in the document.',
        status: 'No changes waiting',
      },
      edited: {
        title: 'Your change appears immediately.',
        body: 'The screen now shows High priority, but the change has not been saved yet.',
        next: 'Save your change to continue.',
        status: 'Your change still needs saving',
      },
      pending: {
        title: 'The application is trying to save.',
        body: 'Your change stays visible while you wait. The application has not announced success yet.',
        next: 'Receive the result to see what happens.',
        status: 'Saving in progress',
      },
      conflict: {
        title: 'Someone saved before you.',
        body: 'Your change is kept on screen. Saving it as it stands could overwrite the other person’s work.',
        next: 'Keep their version, or add your change to the newer version.',
        status: 'A decision is needed',
      },
      offline: {
        title: 'The connection dropped.',
        body: 'Your change stays on screen. Without a response, the application cannot promise that it was saved.',
        next: 'Restore the connection to retry without saving the same change twice.',
        status: 'Saving cannot be confirmed yet',
      },
      invalid: {
        title: 'This change was not accepted.',
        body: 'The scenario sent an unknown priority. The application explains the rejection and restores the last saved value.',
        next: 'Start again or try another situation.',
        status: 'The last saved value is protected',
      },
      accepted: {
        title: 'Your change has been saved.',
        body: 'The screen and the saved document now show the same priority. You have a reliable confirmation.',
        next: 'Start again or compare another situation.',
        status: 'Change saved',
      },
      reloaded: {
        title: 'You kept the other person’s version.',
        body: 'Your local change was discarded without another save. The displayed priority matches their version.',
        next: 'Start again to try the other choice.',
        status: 'The other person’s version is loaded',
      },
      'b-confirmed': {
        title: 'The newest change has been saved.',
        body: 'Two saves crossed paths. The newest one has responded; an older response is still on its way.',
        next: 'Receive the older response to see whether it can erase the newer result.',
        status: 'Newest change saved',
      },
      'stale-ignored': {
        title: 'The older response did not erase anything.',
        body: 'The application recognised a response that was too old and ignored it. The newest change stays saved.',
        next: 'Start again or compare another situation.',
        status: 'The newest result is preserved',
      },
    },
  },
  decisions: {
    title: 'Should one failure\nstop everything?',
    intro:
      'Your application prepares a document, saves it and notifies its users. Compare what happens when message delivery stops.',
    tryFailure: 'Stop message delivery',
    restore: 'Restore message delivery',
    modeLabel: 'Two ways to organise the same application',
    modes: {
      modular: 'Everything in one application',
      services: 'Separate services',
    },
    eventLabel: 'What happens',
    events: {
      healthy: 'Everything works',
      crash: 'Message delivery stops',
      contract: 'The messaging service is updated',
    },
    queue: 'Send the message later',
    queueHint: 'Available with separate services',
    units: {
      modular: 'THE THREE TASKS RUN TOGETHER',
      services: 'THE TASKS CAN RUN SEPARATELY',
    },
    nodes: {
      requests: 'The request',
      documents: 'The document',
      notifications: 'The message',
    },
    nodeRoles: {
      requests: 'The user asks to save',
      documents: 'The application prepares the content',
      notifications: 'Users are notified',
    },
    statuses: {
      available: 'This task can continue',
      stopped: 'This task has stopped',
      waiting: 'This task is waiting for delivery',
      changing: 'This task needs updating',
    },
    process: {
      modular: 'A shared process',
      services: 'Separate processes',
    },
    storage: {
      modular: 'The tasks share the same workspace',
      services: 'Each service keeps its own data',
    },
    localCall: 'then →',
    networkCall: 'waits →',
    queuedEvent: 'will be sent later →',
    changingContract: 'needs updating →',
    changingTypes: 'update together →',
    outcomes: {
      modularHealthy:
        'Everything works: the three tasks move together. Stop delivery to see how they are connected.',
      servicesHealthy:
        'The tasks are separate. But when each waits for the next, a failure can still block the journey: try stopping delivery.',
      modularCrash:
        'Message delivery stopped and the whole application stopped with it. Compare separate services: will the result differ?',
      servicesCrash:
        'The services are separate, but the document still waits for the messaging service. Try sending the message later.',
      queuedCrash:
        'The document can be saved while the message waits. Delivery must recover after the failure without creating duplicates.',
      modularContract:
        'The messaging service is updated. Tasks can be updated and released together, but their responsibilities still need to stay clear.',
      servicesContract:
        'The messaging service is updated. Other services must still be able to talk to it: their updates need to remain compatible.',
    },
    benefit:
      'The right choice depends on the need: let the user continue while planning how failed tasks will recover.',
    skills: 'Software architecture · failure handling · contracts · deployment',
  },
  architecture: {
    title: 'What happens\nafter your click?',
    intro: 'You click “Save”. Follow your request until a confirmation comes back.',
    next: 'Follow the request',
    again: 'See the journey again',
    legend: 'Your request travels forward; a confirmation comes back to your screen.',
    benefit:
      'Clear responsibilities help an application evolve without making the whole user journey fragile.',
    skills: 'Full-Stack design · React · TypeScript · Node.js · Go · data',
    steps: [
      {
        name: 'Your screen',
        title: 'You ask to save.',
        body: 'The interface shows your document and passes on your action. It must also tell you whether saving is waiting, successful or unsuccessful.',
        why: 'You know what is happening instead of clicking without feedback.',
      },
      {
        name: 'The request',
        title: 'The application checks what you asked for.',
        body: 'The request is received and checked: is the required information present? A clear response is prepared if something is missing.',
        why: 'A useful error helps you correct your action.',
      },
      {
        name: 'The processing',
        title: 'The application applies its rules.',
        body: 'The application decides how to save the document, respecting its rules and any related actions.',
        why: 'The outcome stays consistent, whichever screen you use.',
      },
      {
        name: 'The memory',
        title: 'The document is kept.',
        body: 'The data is saved so it can be found later. A confirmation can now travel back to your screen.',
        why: 'You can find your work again after leaving the page.',
      },
    ],
  },
  agents: {
    title: 'How can you delegate to AI\nwithout losing control?',
    intro:
      'Explore a proposed change, its checks and your final decision. Everything is simulated locally.',
    scenarios: {
      endpoint: 'Add a feature to the application',
      regression: 'Fix something that stopped working',
      refactor: 'Improve the code without breaking behaviour',
    },
    situations: {
      endpoint:
        'The application should save a note and explain what is missing if its title is empty.',
      regression:
        'A note without a title causes an unexpected error. It needs to be understood, corrected and checked.',
      refactor:
        'A component is becoming difficult to maintain. Its organisation must change while its behaviour stays the same.',
    },
    roleLabels: {
      architect: 'Define the need',
      developer: 'Propose the change',
      tester: 'Check the outcome',
      reviewer: 'Review the risks',
    },
    next: [
      'See the proposal',
      'Check the proposal',
      'Review the risks',
      'Make a decision',
      'Human decision',
    ],
    previous: 'Return to the previous step',
    diagnose: 'Understand why it failed',
    returnDev: 'Send the fix to Developer',
    roles: {
      architect: {
        title: 'Clarify what needs to be built.',
        body: 'The request becomes concrete criteria: what should work and what should be rejected.',
        why: 'A clear request helps avoid building a solution that misses the need.',
      },
      developer: {
        title: 'A focused change is proposed.',
        body: 'The change should meet the request without unnecessarily transforming the rest of the application.',
        why: 'A bounded change is easier to understand, check and maintain.',
      },
      tester: {
        title: 'Examine the situations that matter.',
        body: 'The example shows what should happen normally, when information is missing and when something fails.',
        why: 'Looking correct is not enough: difficult cases need attention too.',
      },
      reviewer: {
        title: 'A second perspective questions the proposal.',
        body: 'The review looks for missed risks, unnecessary responsibilities and behaviour that might be broken.',
        why: 'Reviewing before acceptance reduces the risk of avoidable mistakes.',
      },
      orchestrator: {
        title: 'Work moves between the roles.',
        body: 'Coordination passes on the need and proposals, then routes failures back for correction.',
        why: 'Coordinating assistants does not replace a person examining their results.',
      },
      debugger: {
        title: 'Find the cause before fixing it.',
        body: 'The failing example is isolated to understand why the expected response did not arrive.',
        why: 'Fixing the cause avoids merely hiding a symptom.',
      },
      documentation: {
        title: 'The choices remain understandable later.',
        body: 'Documentation keeps track of what changed, why, and the limits needed to maintain the software.',
        why: 'Someone can continue the work without guessing the author’s intentions.',
      },
      human: {
        title: 'The final decision is yours.',
        body: 'Examine the proposals and checks, then accept or request another version.',
        why: 'Responsibility does not disappear because assistants took part.',
      },
    },
    failedTitle: 'An example did not give the expected result.',
    failedBody:
      'A note without a title causes an error instead of explaining what is missing. Explore the diagnosis before proceeding.',
    correctedTitle: 'The failing example has been revisited.',
    correctedBody:
      'The proposed fix now asks for the missing title. The normal case still needs review before your decision.',
    humanBefore: 'Explore the need, proposal, checks and review. You can then make a decision.',
    humanMissing:
      'Some roles have not been explored. Return to the steps you skipped before approving.',
    humanUnresolved:
      'The scenario’s problem has not been corrected yet. Return to Tester, then follow diagnosis and correction.',
    humanReady:
      'You have explored the proposals. Confirm that you reviewed them, then accept or request another version.',
    checks: {
      criteria: 'I reviewed what was requested',
      evidence: 'I examined the verification examples',
    },
    revise: 'Request another proposal',
    accept: 'Accept the simulated proposal',
    accepted: 'You accepted the proposal in this simulation.',
    benefit:
      'Assistants can speed up work; clear criteria, checks and a human decision help protect its quality.',
    skills: 'Agent orchestration · task framing · testing · review · engineering judgement',
  },
} as const satisfies TranslationShape<typeof fr>;

export const labStories = { fr, en };
