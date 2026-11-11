# Rémi Tilmant — Portfolio Full-Stack & AI Engineering

Portfolio statique bilingue FR/EN, construit avec React, TypeScript strict, Vite, Tailwind CSS, Motion et Lucide. Aucune API, aucun backend, aucun tracking. Les visualisations d’architecture et d’agents sont pédagogiques : elles n’exécutent aucun agent.

## Développement

Node.js 22.12+ recommandé.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Le build final se trouve dans `dist/`. Le serveur de développement affiche son adresse locale dans le terminal.

## Modifier le contenu

- `src/data/profile.ts` : identité, GitHub, email et LinkedIn. Les liens vides sont masqués. Renseigner `careerStart` au format `YYYY-MM-DD` pour calculer les années révolues automatiquement. Sans date, `initialExperience: 7` est la référence unique, à actualiser manuellement. Aucune date de carrière n’a été supposée.
- `src/data/content.ts` : textes d’interface français et anglais. Le français est la langue initiale ; une préférence explicite est conservée localement quand le navigateur le permet.
- `src/data/skills.ts` : les quatre domaines, descriptions et technologies des filtres.
- `src/data/projects.ts` : liste typée des futurs projets publics. Aucun ancien dépôt privé ou archivé n’est affiché.
- `src/styles.css` : identité graphique et responsive. Les préférences de mouvement réduit sont respectées.

Pour ajouter un projet, ajouter un objet à `projects` : `id`, `name`, `description: { fr, en }`, `stack`, `image`, `imageAlt: { fr, en }`, `github`, `category` (`frontend`, `backend`, `architecture` ou `ai`) et éventuellement `demo`. Placer les visuels dans `public/projects/` et référencer `/projects/nom.webp`. Les cartes et filtres sont générés sans changer les composants. Utiliser uniquement des liens HTTPS de confiance. Le mode vide disparaît automatiquement.

## GitHub Pages — préparation sans publication

Le site vise le dépôt utilisateur `Towrowrow.github.io` et l’URL `https://towrowrow.github.io/`. La configuration Vite utilise donc `base: '/'`. Aucun dépôt distant n’est créé, aucun code n’est poussé par cette livraison.

Après accord explicite pour publier :

1. Créer ou sélectionner le dépôt `Towrowrow.github.io` sur le compte souhaité.
2. Envoyer ces fichiers à la racine du dépôt, sur la branche `main`, en incluant `package-lock.json`.
3. Dans Settings → Pages, sélectionner **GitHub Actions** comme source.
4. Le workflow `.github/workflows/deploy.yml` installe les dépendances verrouillées, exécute les tests, compile puis déploie l’artefact `dist` avec l’environnement `github-pages`.

Le workflow peut aussi être lancé manuellement. Si la branche principale a un autre nom, adapter le déclencheur. Pour un hébergement en sous-répertoire, adapter `base`, les chemins publics, le canonical et le sitemap.

## Qualité et limites éditoriales

Navigation clavier, lien d’évitement, boutons avec états accessibles, mises à jour annoncées pour les panneaux, images différées pour les futurs projets, responsive et mouvement réduit. Les tests portent sur le calcul d’expérience. Le build vérifie TypeScript et produit les fichiers optimisés. Le texte de présentation contient uniquement les informations fournies ; pas de clients, de métriques de performance ni d’expériences inventées.

Le contact pointe actuellement vers GitHub. Ajouter email ou LinkedIn dans la configuration pour proposer ces canaux. Aucun formulaire ne prétend envoyer de message.

## Vérification de cette version

- `npm test` : 2 tests réussis (date inconnue/invalide, anniversaire et date future).
- `npm run build` : compilation TypeScript et build Vite réussis.
- Serveur local : réponse HTTP 200.
- Navigateur : rendu desktop et mobile, sélection de couche backend, filtre backend, rôle Reviewer, bascule FR/EN et menu mobile vérifiés. Aucun débordement horizontal dans le viewport mobile contrôlé ; aucune erreur ou alerte de console relevée.
- La publication GitHub Pages n’a pas été exécutée. Aucun audit Lighthouse ni vérification sur appareil physique n’a été réalisé.
