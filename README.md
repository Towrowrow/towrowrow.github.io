# Rémi Tilmant — Portfolio Full-Stack & AI Engineering

Portfolio personnel statique bilingue, construit avec React, TypeScript strict, Vite, Tailwind CSS, Motion et Lucide. Ce site est le projet présenté : les laboratoires sont des simulations pédagogiques locales, sans backend, sans appel à un modèle IA et sans tracking.

URL publique prévue : **https://towrowrow.github.io/**. Français sur `/`, anglais sur `/en/`.

## Démarrer

Node.js **22.13+** (branche 22 LTS ou version LTS plus récente) et npm.

```sh
npm ci
npm run dev
```

## Commandes de qualité

| Commande               | Rôle                                                                          |
| ---------------------- | ----------------------------------------------------------------------------- |
| `npm run format`       | Formater le code, les styles et la configuration avec Prettier                |
| `npm run format:check` | Vérifier le formatage sans modifier les fichiers                              |
| `npm run lint`         | ESLint : imports, hooks, types explicites et absence de ternaires imbriqués   |
| `npm run typecheck`    | Vérifier TypeScript dans l’application, la configuration Vite et les tests TS |
| `npm test`             | Exécuter les tests de logique, de présentation et de traitement du template   |
| `npm run check`        | Enchaîner formatage, lint, typage et tests                                    |
| `npm run build`        | Vérifier les types, construire, pré-rendre FR/EN et tester le HTML SEO final  |
| `npm run preview`      | Servir le build sur http://127.0.0.1:4173/                                    |

Le workflow existant exécute `npm ci`, `npm run check` puis `npm run build` avant de publier uniquement `dist/`. Ces commandes locales ne publient rien.

## Organisation

```text
src/
  App.tsx                         Composition du parcours et métadonnées côté navigateur
  components/                     Hero, présentation, expertise, architecture, navigation, contact
  features/
    engineering-decisions/        Contrôles, diagramme, conséquences et composition
    request-playground/           Document, cycle de requête, résolutions et composition
    ai-engineering-lab/           Réseau, livrables, validation humaine et composition
  labs/                           Fonctions et reducers purs ; aucune dépendance React
  i18n/                           Traductions site, décisions, playground, agents et livrables
  data/                           Profil, compétences, couches d’architecture, SEO
  styles/                         Styles globaux, Hero, sections et laboratoires
    labs/                         Cadre commun, chaque laboratoire, responsive, états accessibles
  utils/                          Résolution des assets et validation des options natives
scripts/                          Pré-rendu et traitement du template HTML
public/                           Assets publiés, photographie optimisée et validation Google
tests/                           Tests des simulations, présentation et HTML de production
```

Chaque fonctionnalité possède un composant de composition et quelques panneaux présentatifs. Les changements d’état restent dans les reducers purs de `src/labs/`. Les fonctions `presentation.ts` dérivent les libellés et états visuels sans créer une seconde source d’état. Aucun hook personnalisé n’est nécessaire pour envelopper simplement `useReducer`.

Les états du Playground forment une union discriminée : seules les requêtes en attente portent un type de tentative. Les options, couches, événements et rôles sont nommés ; les traductions ne dépendent pas d’index alignés à la main. Les livrables IA combinent une base commune et des variantes de scénario pour éviter de dupliquer des paragraphes identiques.

## Contenu et traductions

### Pédagogie des laboratoires — V2.1.1

Chaque laboratoire possède son propre parcours : comparaison des conséquences pour Decisions, trajet d’un enregistrement pour Architecture Explorer, document partagé et résolution pour le Playground, proposition et validation humaine pour le Lab IA. Les textes pédagogiques FR/EN sont dans `src/i18n/labStories.ts`. Les fonctions pures `story.ts` ou `lesson.ts`, à côté des composants de chaque fonctionnalité, dérivent les explications contextuelles sans ajouter une seconde source d’état. Les simulations et leurs reducers restent inchangés.

Les contrats, codes HTTP et livrables détaillés sont conservés dans des éléments HTML `details`, fermés par défaut et accessibles au clavier. Le pré-rendu contient les explications et ces approfondissements ; JavaScript est nécessaire pour faire évoluer les simulations. Voir [V211_REVIEW.md](V211_REVIEW.md) pour les parcours et les vérifications.

L’identité `RT.` est réservée aux favicons ; le nom complet reste l’identité principale. Les SVG, ICO, PNG 16/32/48/96 et l’icône Apple 180 sont dans `public/`. Le SVG utilise des tracés autonomes, sans police distante. L’utilitaire d’auteur facultatif `scripts/generate_favicons.py` reproduit ces assets avec Python et Pillow ; il n’est pas exécuté par le build ou la CI. Les ressources générées sont déjà incluses, sans nouvelle dépendance npm. Voir [V21_REVIEW.md](V21_REVIEW.md) et [SEO.md](SEO.md).

- `src/data/profile.ts` : identité, email, GitHub, liens optionnels et expérience. Les liens vides sont masqués. Sans `careerStart`, la référence est `initialExperience: 7` ; aucune date n’est inventée.
- `src/i18n/site.ts` : navigation, Hero et sections éditoriales.
- `src/i18n/decisions.ts`, `playground.ts`, `agents.ts` : textes des trois laboratoires.
- `src/i18n/artifacts.ts` : exemples de livrables simulés, distincts de la logique de sélection.
- `src/data/skills.ts` et `engineering.ts` : compétences et architecture conceptuelle.
- `src/data/seo.ts` : titres, descriptions, URLs canoniques et Schema.org `Person`.

Chaque domaine utilise les mêmes clés FR/EN, vérifiées par TypeScript (`TranslationShape`). Le HTML principal et le SEO sont pré-rendus dans les deux langues ; les liens de langue restent de vrais liens explorables. L’hydratation enrichit le HTML existant sans le masquer.

La photographie autorisée est `public/images/remi-tilmant.webp` : 400 × 400, environ 15 Ko, sans modification d’apparence. La taille affichée est définie en CSS : 210 px sur desktop et 112 px sur mobile. Le JFIF original et les captures de revue ne sont pas copiés dans `dist/`.

## Ajouter un laboratoire

1. Créer les types et transitions purs dans `src/labs/`, avec des actions explicites et des gardes pour les actions hors contexte.
2. Tester les comportements, erreurs, changements de scénario et réinitialisations dans `tests/` ; ajouter les fonctions de présentation testables si nécessaire.
3. Créer sa composition et ses panneaux dans `src/features/nom-du-laboratoire/`. Garder l’état au plus près de la composition ; ne pas multiplier les abstractions pour des fragments triviaux.
4. Définir les textes FR/EN dans `src/i18n/`, puis les styles dans `src/styles/`. Conserver le focus clavier, les annonces utiles et `prefers-reduced-motion`.
5. Ajouter la section dans `App.tsx`, maintenir une identité et des ancres uniques, puis exécuter `npm run check` et `npm run build`.

Un laboratoire doit décrire honnêtement ce qui fonctionne réellement et ce qui est simulé. Ne pas ajouter de faux projet professionnel ni d’information sur un employeur ou client.

## Déploiement existant

Le dossier local reste `PORTOFOLIO`. Le remote est `Towrowrow/towrowrow.github.io`, branche `master`. Vite utilise `base: '/'`. Aucun autre dépôt n’est concerné.

GitHub Pages doit utiliser **Settings → Pages → Source : GitHub Actions**. Le workflow `.github/workflows/deploy.yml` est déclenché par les pushes sur `master` et par `workflow_dispatch`. Il conserve le déploiement Pages/OIDC existant. Ne pousser qu’après validation explicite.

Voir [SEO.md](SEO.md) pour les métadonnées et la validation Google, et [CODE_QUALITY_REVIEW.md](CODE_QUALITY_REVIEW.md) pour l’audit et la refactorisation V2.

## Outillage

Prettier gère le formatage ; ESLint gère les imports et les règles de code, sans doublonner les règles de présentation. Les builds, captures et rapports Lighthouse sont exclus des vérifications source. `minimatch` est contraint à une version corrigée via `overrides` pour les outils de développement ; le lint et les tests vérifient cette combinaison. Aucun outil de qualité n’est livré dans le bundle du navigateur.
