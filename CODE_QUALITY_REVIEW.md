# Audit et refactorisation du portfolio V2

Revue locale du 11 novembre 2026. Aucun commit ni push effectué.

## Faiblesses constatées

- TSX artificiellement condensé dans l’ensemble des sections, pas uniquement Engineering Decisions ; plusieurs lignes dépassaient 2 000 caractères.
- JSX des laboratoires mêlant composition, contrôles, choix de présentation et règles de simulation.
- Textes FR/EN centralisés dans un objet générique `v2`, avec des tableaux parallèles et des index implicites pour les scénarios, conséquences et étapes.
- Assertions sur les valeurs des listes natives et sur le résultat du modèle d’architecture ; états du Playground exprimés par des booléens pouvant se contredire.
- Gardes insuffisantes pour certaines actions du workflow IA lorsqu’elles étaient appelées directement hors du contexte prévu par l’interface.
- CSS compacté, styles de maquettes inutilisés et documentation décrivant encore des composants retirés.
- Absence de formateur, lint, commande dédiée de typage des tests et contrôles correspondants en CI.

## Structure et responsabilités

La structure proposée a été présentée avant la réorganisation. `components/` conserve les sections éditoriales ; les trois laboratoires sont organisés dans `features/`, chacun avec une composition et quelques panneaux dédiés. Les composants TSX comptent désormais au plus 126 lignes ; Engineering Decisions est une composition lisible de 55 lignes.

Les reducers et modèles restent dans `labs/`, sans React ni traductions. Les fonctions de présentation sont pures et calculent leurs résultats depuis le modèle, sans dupliquer son état. Les messages sont séparés dans `i18n/` par domaine ; TypeScript vérifie les clés françaises et anglaises. Les exemples de livrables IA reposent sur une base et des variantes plutôt que sur des copies intégrales de chaque scénario.

Les styles sont formatés dans `styles/`. Le CSS des laboratoires est réparti entre cadre partagé, chaque expérience, responsive et états accessibles. L’ordre de cascade est explicite. Le CSS ancien non importé, le catalogue vide de projets et les anciennes données d’agents inutilisées ont été retirés.

Aucun hook personnalisé n’a été ajouté : les compositions utilisent directement `useState` ou `useReducer`. Une validation d’options partagée sert uniquement à contrôler les valeurs provenant des listes natives, sans assertion de type.

## États et contrats

- Architecture : nœuds, événements et conséquences nommés ; résultat explicitement typé, sans assertion sur l’issue calculée.
- Playground : union discriminée entre brouillon, attente, conflit/coupure et états résolus. Une tentative initiale, une reprise et une réapplication sont distinctes ; les états résolus ne conservent pas de type de tentative.
- Agents : positions bornées, rôles explicites, navigation sans index non contrôlé. Diagnostic, retour du Debugger, consentement et révision disposent de gardes contextuelles. Les actions accessibles depuis l’interface conservent leur fonctionnement validé ; seules les actions hors contexte sont refusées.
- Aucun `any` explicite ni assertion non nulle dans les sources applicatives. ESLint vérifie notamment les hooks, imports de types, assertions non nulles et ternaires imbriqués.

## Outillage et CI

Prettier utilise une largeur cible de 100 caractères, deux espaces, des quotes simples et des fins de ligne LF. Les longues chaînes éditoriales restent des chaînes lisibles, sans découpage artificiel du texte.

Commandes : `format`, `format:check`, `lint`, `typecheck`, `test`, `check`, `build`. Le typage inclut les tests TS. Le workflow existant sur `master` exécute `npm ci`, `npm run check`, puis `npm run build` et déploie uniquement `dist/` après un futur push autorisé.

Le traitement du template de pré-rendu accepte désormais les balises SEO sur plusieurs lignes. Un test dédié protège ce cas. Le formateur ne peut plus provoquer de métadonnées dupliquées.

Les nouvelles dépendances sont uniquement des outils de développement. L’override de `minimatch` corrige l’alerte transitive des outils ESLint ; cette combinaison passe le lint et les tests. L’installation npm finale indique zéro vulnérabilité connue.

## Portrait

Photographie et fichier WebP inchangés. Taille affichée réduite à 210 px sur desktop et tablette, 112 px sur mobile. Cadre et ombre allégés ; légende à côté sur mobile. La citation dispose de davantage de largeur et reste le point d’entrée visuel de la section. Aucun recadrage supplémentaire ni modification d’apparence.

## Non-régression et résultats

Les tests et le build ont été exécutés après le formatage, après l’extraction des fonctionnalités puis après les changements de modèles et de styles. Une comparaison locale avec le build conservé avant refactorisation confirme :

- HTML pré-rendu FR/EN inchangé, en ignorant uniquement les commentaires techniques React et l’espacement entre balises.
- Métadonnées SEO, liens canoniques, alternatives linguistiques et données Person inchangés.
- Seule évolution visuelle intentionnelle : la composition et la taille du portrait.

Résultats finaux :

- `npm run check` : formatage, ESLint et TypeScript réussis ; 30 tests réussis.
- `npm run build` : client et pré-rendu réussis ; 3 tests SEO réussis. Total : 33 tests.
- Couverture ajoutée sur tous les états accessibles du Playground : changement de scénario, reset, actions illégales, conservation des données confirmées et invariants d’état. Vérifications supplémentaires des agents : contexte du diagnostic, consentement, navigation, révision et reset.
- Interface : cinq scénarios du Playground et trois scénarios IA testés à nouveau ; transitions et validation humaine fonctionnelles. Versions FR/EN et portrait contrôlés à 320, 360, 390, 430, 768, 1024 et 1440 px, sans débordement horizontal.
- Aucune erreur ni alerte JavaScript relevée dans les sessions contrôlées ; aucun chargement de ressource en échec dans l’audit Lighthouse.
- Lighthouse local mobile après refactorisation : performance 100, accessibilité 100, bonnes pratiques 100, SEO 100. Mesure locale variable, pas une garantie en production ni une certification d’accessibilité.

Le bundle JavaScript compressé est d’environ 136 Ko et le CSS compressé d’environ 13 Ko. Aucun nouveau service ni dépendance de production ajouté.

## Limites et validation

Aucune anomalie bloquante connue. Les tests responsive sont réalisés en émulation navigateur ; Safari/iOS physique et un parcours complet au lecteur d’écran restent hors de cette revue. La CI modifiée ne sera exécutée sur GitHub qu’après le futur push explicitement autorisé.

Aperçu : http://127.0.0.1:4173/#about. Le dépôt, le dossier local et les URLs restent inchangés.
