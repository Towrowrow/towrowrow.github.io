# Revue locale — Portfolio V2.1.1

## Périmètre et constat

Les explications V2.1 entouraient encore des interfaces organisées comme des outils de diagnostic. Les actions, résultats et détails techniques avaient une importance visuelle comparable. Cette version réorganise les quatre laboratoires autour d’une situation concrète, sans modifier leurs reducers ni supprimer de scénario. Les autres sections, le portrait discret, le SEO et le favicon RT. sont préservés. Aucune dépendance, aucun backend et aucun service externe ajouté.

## Quatre expériences distinctes

| Laboratoire            | Difficulté initiale                                      | Parcours actuel                                                                                                                                  | Approfondissement conservé                                         |
| ---------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| Engineering Decisions  | Des noms d’architecture avant la conséquence utilisateur | Simuler une panne d’envoi, comparer une application commune et des services séparés, puis différer le message pour observer la différence        | Modules, services, contrats, hypothèses et conséquences techniques |
| Architecture Explorer  | Des couches et technologies sans action concrète         | Suivre un clic sur Enregistrer : écran, demande, traitement, mémoire ; naviguer librement ou avancer étape par étape                             | Rôle, contrat et technologies de la couche sélectionnée            |
| Engineering Playground | Codes HTTP, chronologie et JSON présents dès l’entrée    | Modifier une priorité, enregistrer, recevoir le résultat et choisir une solution ; progression et explication contextuelle dans un panneau dédié | Versions, requêtes, chronologie, protections et JSON               |
| AI Engineering Lab     | Livrables et rôles difficiles à relier au problème       | Comprendre une demande, examiner une proposition, vérifier, relire puis décider ; diagnostic obligatoire pour corriger la régression             | Livrables détaillés, exemples de tests et code simulé              |

Les approfondissements sont fermés par défaut. Ils utilisent `details` / `summary` natifs. Les bénéfices et compétences apparaissent au fil de l’expérience ou de sa conclusion, plutôt que sous forme d’un guide identique répété quatre fois.

## Sauvegarde : actions et résultats

Le scénario initial de présentation est désormais le conflit, sans changer la valeur par défaut du modèle pur. Le document réagit immédiatement à la modification, mais ne prétend pas être enregistré avant confirmation. Après l’envoi, le bouton de sauvegarde disparaît ; sur mobile, un lien conduit au résultat et y déplace le focus.

- Succès : confirmation et valeur réellement enregistrée concordent.
- Modification refusée : explication du refus et retour à la valeur enregistrée.
- Conflit : choix entre récupérer la version de l’autre personne et réappliquer son changement sur la nouvelle version. Les deux branches restent distinctes.
- Hors connexion : changement conservé à l’écran, nouvelle tentative puis confirmation explicite.
- Réponse tardive : réception du résultat récent, puis de l’ancienne réponse ; cette dernière ne remplace pas le résultat récent.

Les termes HTTP 409/422, `If-Match`, `intentId`, projection et réconciliation ne sont plus nécessaires dans le parcours principal. Ils restent disponibles dans la lecture technique.

## IA et architecture : garanties

Les trois scénarios IA sont conservés : ajout d’une fonction, correction d’une régression, amélioration du code. La simulation reste annoncée comme locale, sans agent ni modèle exécuté. L’acceptation exige toujours le parcours requis, les vérifications humaines et, pour la régression, le diagnostic puis la correction. Une case cochée ne contourne pas ces gardes. La demande d’une autre proposition et la navigation libre restent disponibles.

Decisions conserve les deux modes, les trois événements et l’envoi différé. Avec une application commune, la case d’envoi différé désactivée apparaît décochée ; le modèle reste inchangé. Les explications distinguent l’isolation des services de leur dépendance aux réponses synchrones. L’envoi différé expose aussi son coût de reprise et de prévention des doublons.

## Organisation et tests ciblés

- `src/i18n/labStories.ts` : textes FR/EN de la lecture pédagogique, clés vérifiées par TypeScript.
- `features/request-playground/lesson.ts` : explication dérivée de l’état de sauvegarde.
- `features/request-playground/SaveOutcome.tsx` : progression, résultat, action suivante et conclusion.
- `features/engineering-decisions/story.ts` : libellés concrets sur le modèle existant.
- `features/ai-engineering-lab/lesson.ts` : rôle, contexte de correction et décision humaine.
- `src/styles/lab-stories.css` : présentation pédagogique et adaptation mobile.
- `tests/lessons.test.ts` : dix tests FR/EN sur brouillon, conflit, réseau, réponse tardive et gardes humaines.
- `tests/seo-build.test.mjs` : quatre approfondissements présents et fermés dans chaque langue ; jargon et JSON absents de la lecture principale du Playground, contrats conservés.

Le composant générique de guide V2.1 est remplacé par ces compositions spécifiques. Son ancienne version est conservée uniquement dans le dossier local ignoré `.refactor-baseline/v21-guidance/`.

## Vérifications visuelles et fonctionnelles

Effectuées sur le build de production servi localement :

- FR : cinq scénarios de sauvegarde, deux résolutions du conflit, reprise réseau, réponse tardive ; trois parcours IA acceptés après les gardes, dont diagnostic et correction ; deux architectures et trois événements, envoi différé ; cycle des quatre couches.
- EN : cinq résultats de sauvegarde, libellés du diagnostic et présence des quatre approfondissements fermés.
- FR : largeurs 320, 360, 390, 430, 700, 768, 1024 et 1440 px ; EN : 320, 390, 700 et 1440 px. Aucun débordement horizontal des titres et contrôles mesurés.
- Inspection visuelle du Playground desktop et mobile ; lien mobile vers le résultat avec focus sur `save-result`.
- Ouverture et fermeture de l’approfondissement au clavier avec Entrée.
- Portrait local chargé, dimensions desktop de 210 px préservées ; styles mobile existants inchangés.
- Aucune erreur ni alerte console observée pendant ces parcours. Pré-rendu et protections CSS `prefers-reduced-motion` conservés.

Ces vérifications ne remplacent pas un essai avec des visiteurs non techniques. La compréhension en moins de trente secondes reste un objectif à valider avec eux, pas une mesure acquise.

## Performances et publication

Validation finale : `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test` et `npm run build` réussis. Les 43 tests unitaires et 4 tests du HTML de production passent (47 au total). La comparaison du HTML confirme les titres, métadonnées, URLs canoniques, alternances de langues et données Person inchangés en FR/EN. Les assets et le fichier de validation Google sont conservés. Le contrôle de signatures sur 98 fichiers candidats n’a détecté aucun secret ; cela ne constitue pas une garantie exhaustive. Aucune modification n’est indexée dans Git.

Lighthouse sur la version française locale : performance **100**, accessibilité **100**, bonnes pratiques **100**, SEO **100**. Ces scores sont propres à cette exécution locale et ne garantissent pas les mêmes valeurs sur chaque appareil. Lighthouse conserve des pistes d’optimisation d’image et de ressources bloquantes malgré ces scores.

Le JavaScript de production est d’environ 454 Ko, soit 145 Ko gzip ; CSS environ 65 Ko, soit 14 Ko gzip. Les simulations restent locales et aucun appel IA n’est émis.

État de référence Git : `master`, HEAD `894c35eddf1cddfa44a8c854ba791bd97da552cb`. Aucun commit, push, merge ou déploiement effectué pour V2.1/V2.1.1. Les rapports Lighthouse, captures et outils de contrôle temporaires sont ignorés par Git.
