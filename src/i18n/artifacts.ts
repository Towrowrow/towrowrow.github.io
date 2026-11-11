import type { Locale } from '../data/profile';
import type { AgentRole, AgentScenario } from '../labs/agentMachine';

export interface AgentArtifact {
  kind: string;
  title: string;
  intro: string;
  items: readonly string[];
  code?: string;
  status: string;
}
interface ArtifactMessages {
  base: Record<AgentRole, AgentArtifact>;
  scenarios: Partial<Record<AgentScenario, Partial<Record<AgentRole, Partial<AgentArtifact>>>>>;
  correctedRegression: Partial<AgentArtifact>;
}
export const agentArtifacts: Record<Locale, ArtifactMessages> = {
  fr: {
    base: {
      architect: {
        kind: 'CONCEPTION',
        title: 'Un contrat avant le code.',
        intro: 'Délimiter la demande et rendre les critères d’acceptation vérifiables.',
        items: [
          'Définir les entrées autorisées.',
          'Décrire les réponses et les erreurs.',
          'Prévoir les cas limites.',
        ],
        code: 'POST /decisions\n201 → décision créée\n422 → entrée invalide',
        status: 'Proposition à examiner',
      },
      developer: {
        kind: 'IMPLÉMENTATION',
        title: 'Une modification bornée.',
        intro: 'Relier chaque changement à un critère explicite, sans élargir la tâche.',
        items: [
          'Valider les entrées à la frontière.',
          'Garder la règle métier isolée.',
          'Décrire les erreurs.',
        ],
        code: '// Extrait fictif\nif (!input.title.trim()) {\n  return invalid("title");\n}',
        status: 'Exemple de code à vérifier',
      },
      tester: {
        kind: 'VÉRIFICATION',
        title: 'Des comportements à prouver.',
        intro: 'Associer les cas limites aux réponses attendues.',
        items: [
          'Entrée valide → création.',
          'Titre vide → refus explicite.',
          'Erreur de stockage → erreur maîtrisée.',
        ],
        code: 'Résultats illustratifs uniquement.\nAucun test exécuté par ce Lab.',
        status: 'Exemples de vérification présentés',
      },
      reviewer: {
        kind: 'REVUE',
        title: 'Questionner ce qui reste fragile.',
        intro: 'Chercher les régressions et les hypothèses que le code ne vérifie pas encore.',
        items: [
          'Le contrat correspond-il au besoin ?',
          'Les erreurs conservent-elles leur sens ?',
          'Le changement ajoute-t-il une responsabilité inutile ?',
        ],
        code: 'Recommandation du scénario :\nvalidation humaine avant acceptation',
        status: 'Points de vigilance à relire',
      },
      orchestrator: {
        kind: 'COORDINATION',
        title: 'Organiser, pas approuver.',
        intro: 'Rendre explicites les entrées, les sorties et les retours entre les rôles.',
        items: [
          'Cadrer la tâche et ses critères.',
          'Transmettre un contexte borné.',
          'Router un échec vers le diagnostic.',
          'Préparer les éléments pour l’humain.',
        ],
        status: 'La décision finale ne lui appartient pas',
      },
      debugger: {
        kind: 'DIAGNOSTIC',
        title: 'Isoler avant de corriger.',
        intro: 'Un échec de vérification renvoie vers une hypothèse testable.',
        items: [
          'Reproduire le cas qui échoue.',
          'Identifier la frontière fautive.',
          'Proposer une correction ciblée.',
        ],
        code: 'Exemple simulé : titre vide\nattendu 422 / observé 500',
        status: 'Hypothèse de correction proposée',
      },
      documentation: {
        kind: 'TRANSMISSION',
        title: 'Rendre la décision durable.',
        intro: 'Documenter les changements vérifiés et les limites qui restent connues.',
        items: [
          'Contrat et exemples d’erreur.',
          'Décisions et compromis.',
          'Consignes de maintenance.',
        ],
        code: 'Document fictif produit à partir\ndes éléments du scénario.',
        status: 'Documentation à relire',
      },
      human: {
        kind: 'DÉCISION',
        title: 'Revenir aux critères.',
        intro: 'L’humain peut accepter, refuser ou demander une révision.',
        items: [
          'Relire le besoin et les limites.',
          'Examiner les propositions et exemples.',
          'Consigner une décision explicite.',
        ],
        code: 'Ni l’animation ni le scénario\nne constituent une preuve réelle.',
        status: 'En attente de votre décision dans la simulation',
      },
    },
    scenarios: {
      regression: {
        architect: {
          title: 'Un cas reproductible avant la correction.',
          intro: 'Fixer le comportement attendu et isoler le scénario qui échoue.',
          items: [
            'Identifier le déclencheur.',
            'Décrire attendu et observé.',
            'Définir le test de non-régression.',
          ],
          code: 'Scénario fictif : entrée vide\nattendu 422 / observé 500',
        },
        tester: {
          title: 'Un exemple en échec.',
          items: [
            'Cas nominal : comportement attendu.',
            'Titre vide : erreur interne au lieu du refus prévu.',
          ],
          code: 'Exemple simulé · aucun test réel exécuté',
          status: 'Le scénario propose une boucle de correction',
        },
      },
      refactor: {
        architect: {
          title: 'Préserver les comportements.',
          intro: 'Délimiter les responsabilités avant de déplacer le code.',
          items: [
            'Identifier les états de l’interface.',
            'Repérer les dépendances.',
            'Écrire les invariants à conserver.',
          ],
          code: 'Chargement / erreur / succès\nrestent des états explicites.',
        },
        developer: {
          title: 'Séparer sans changer le comportement.',
          intro: 'Extraire la logique d’état du composant, en conservant ses contrats publics.',
          items: [
            'Conserver les props et les événements.',
            'Isoler les transitions dans un reducer pur.',
            'Préserver le focus et les libellés accessibles.',
          ],
          code: '// Extrait fictif\nconst [state, dispatch] = useReducer(reducer, initialState);',
        },
        tester: {
          title: 'Les mêmes états, avant et après.',
          intro: 'Comparer les comportements observables plutôt que la structure interne.',
          items: [
            'Chargement → contenu ou erreur.',
            'Nouvelle tentative après une erreur.',
            'Navigation clavier et conservation du focus.',
          ],
          code: 'Exemples simulés · aucun test réel exécuté',
        },
        reviewer: {
          intro:
            'Vérifier que l’extraction réduit les responsabilités sans ajouter d’abstraction superflue.',
          items: [
            'Les transitions restent-elles explicites ?',
            'Le contrat du composant est-il conservé ?',
            'Les tests décrivent-ils les comportements utiles ?',
          ],
        },
        debugger: {
          code: 'Exemple simulé : nouvelle tentative\nattendu chargement / observé erreur persistante',
        },
      },
    },
    correctedRegression: {
      title: 'Revenir au cas qui échouait.',
      items: [
        'La correction proposée retourne le refus attendu.',
        'Le cas nominal reste à examiner.',
      ],
      status: 'Exemple corrigé dans le scénario · à relire',
    },
  },
  en: {
    base: {
      architect: {
        kind: 'DESIGN',
        title: 'A contract before code.',
        intro: 'Bound the request and make acceptance criteria verifiable.',
        items: ['Define allowed inputs.', 'Describe responses and errors.', 'Plan for edge cases.'],
        code: 'POST /decisions\n201 → decision created\n422 → invalid input',
        status: 'Proposal to review',
      },
      developer: {
        kind: 'IMPLEMENTATION',
        title: 'A bounded change.',
        intro: 'Connect every change to an explicit criterion without expanding the task.',
        items: [
          'Validate inputs at the boundary.',
          'Keep the business rule isolated.',
          'Describe error behaviour.',
        ],
        code: '// Fictional excerpt\nif (!input.title.trim()) {\n  return invalid("title");\n}',
        status: 'Example code to verify',
      },
      tester: {
        kind: 'VERIFICATION',
        title: 'Behaviour to demonstrate.',
        intro: 'Connect edge cases to expected responses.',
        items: [
          'Valid input → creation.',
          'Empty title → explicit rejection.',
          'Storage failure → controlled error.',
        ],
        code: 'Illustrative results only.\nThis Lab does not run tests.',
        status: 'Verification examples presented',
      },
      reviewer: {
        kind: 'REVIEW',
        title: 'Question what is still fragile.',
        intro: 'Look for regressions and assumptions the code does not verify yet.',
        items: [
          'Does the contract match the need?',
          'Do errors retain their meaning?',
          'Does the change add unnecessary responsibility?',
        ],
        code: 'Scenario recommendation:\nhuman validation before acceptance',
        status: 'Points to review',
      },
      orchestrator: {
        kind: 'COORDINATION',
        title: 'Organise, not approve.',
        intro: 'Make the inputs, outputs and feedback between roles explicit.',
        items: [
          'Frame the task and its criteria.',
          'Pass bounded context.',
          'Route a failure to diagnosis.',
          'Prepare evidence for the human.',
        ],
        status: 'The final decision is not delegated to this role',
      },
      debugger: {
        kind: 'DIAGNOSIS',
        title: 'Isolate before correcting.',
        intro: 'A failed check leads to a testable hypothesis.',
        items: [
          'Reproduce the failing case.',
          'Identify the faulty boundary.',
          'Propose a targeted correction.',
        ],
        code: 'Simulated example: empty title\nexpected 422 / observed 500',
        status: 'Correction hypothesis proposed',
      },
      documentation: {
        kind: 'KNOWLEDGE SHARING',
        title: 'Make the decision last.',
        intro: 'Document verified changes and the remaining known limitations.',
        items: [
          'Contract and error examples.',
          'Decisions and tradeoffs.',
          'Maintenance guidance.',
        ],
        code: 'Fictional document based on\nthe scenario material.',
        status: 'Documentation to review',
      },
      human: {
        kind: 'DECISION',
        title: 'Return to the criteria.',
        intro: 'The human can accept, reject or request another iteration.',
        items: [
          'Review the need and its limits.',
          'Examine proposals and examples.',
          'Record an explicit decision.',
        ],
        code: 'Neither the animation nor the\nscenario is real-world evidence.',
        status: 'Waiting for your decision in the simulation',
      },
    },
    scenarios: {
      regression: {
        architect: {
          title: 'A reproducible case before the fix.',
          intro: 'Define expected behaviour and isolate the failing scenario.',
          items: [
            'Identify the trigger.',
            'Describe expected and observed behaviour.',
            'Define the regression test.',
          ],
          code: 'Fictional scenario: empty input\nexpected 422 / observed 500',
        },
        tester: {
          title: 'An example failure.',
          items: [
            'Normal case: expected behaviour.',
            'Empty title: internal error instead of the intended rejection.',
          ],
          code: 'Simulated example · no real tests executed',
          status: 'The scenario proposes a correction loop',
        },
      },
      refactor: {
        architect: {
          title: 'Preserve existing behaviour.',
          intro: 'Define responsibilities before moving code.',
          items: [
            'Identify interface states.',
            'Locate dependencies.',
            'Write down the invariants to preserve.',
          ],
          code: 'Loading / error / success\nremain explicit states.',
        },
        developer: {
          title: 'Separate responsibilities without changing behaviour.',
          intro: 'Extract state logic from the component while preserving its public contracts.',
          items: [
            'Preserve props and events.',
            'Isolate transitions in a pure reducer.',
            'Preserve focus and accessible labels.',
          ],
          code: '// Fictional excerpt\nconst [state, dispatch] = useReducer(reducer, initialState);',
        },
        tester: {
          title: 'The same states, before and after.',
          intro: 'Compare observable behaviour rather than internal structure.',
          items: [
            'Loading → content or error.',
            'Retry after an error.',
            'Keyboard navigation and focus preservation.',
          ],
          code: 'Simulated examples · no real tests executed',
        },
        reviewer: {
          intro: 'Check that extraction reduces responsibilities without unnecessary abstraction.',
          items: [
            'Are transitions still explicit?',
            'Is the component contract preserved?',
            'Do tests describe useful behaviour?',
          ],
        },
        debugger: {
          code: 'Simulated example: retry\nexpected loading / observed persistent error',
        },
      },
    },
    correctedRegression: {
      title: 'Return to the failing case.',
      items: [
        'The proposed correction returns the expected rejection.',
        'The normal path still needs review.',
      ],
      status: 'Corrected scenario example · review required',
    },
  },
};
