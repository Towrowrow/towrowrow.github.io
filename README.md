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

### Évolution visuelle V2

La V2 conserve l’application, les données de profil, les filtres, les projets typés et l’internationalisation de la V1. `src/components/EngineeringExperience.tsx` contient trois composants indépendants : `CinematicHero`, `ArchitectureExplorer` et `AgentWorkflow`. Les rôles, technologies, approches et livrables des deux démonstrations sont centralisés dans `src/data/engineering.ts`. Les animations d’échange illustrent un parcours conceptuel, pas le trafic d’un vrai système ou l’exécution d’agents.

`src/v2.css` définit la nouvelle direction artistique au-dessus des styles partagés : grand nom typographique, profondeur en CSS, contraste anthracite/sauge et espace violet pour les agents. Aucune dépendance supplémentaire, police distante, vidéo ni image lourde n’est ajoutée. Les animations CSS et Motion respectent les préférences de mouvement réduit. L’architecture s’explore au clic et au clavier ; les panneaux annoncent leurs changements et les boutons exposent leur état sélectionné.

- `src/data/profile.ts` : identité, GitHub, email et LinkedIn. Les liens vides sont masqués. Renseigner `careerStart` au format `YYYY-MM-DD` pour calculer les années révolues automatiquement. Sans date, `initialExperience: 7` est la référence unique, à actualiser manuellement. Aucune date de carrière n’a été supposée.
- `src/data/content.ts` : textes d’interface français et anglais. Le français est la langue initiale ; une préférence explicite est conservée localement quand le navigateur le permet.
- `src/data/skills.ts` : les quatre domaines, descriptions et technologies des filtres.
- `src/data/projects.ts` : liste typée des futurs projets publics. Aucun ancien dépôt privé ou archivé n’est affiché.
- `src/styles.css` : identité graphique et responsive. Les préférences de mouvement réduit sont respectées.

Pour ajouter un projet, ajouter un objet à `projects` : `id`, `name`, `description: { fr, en }`, `stack`, `image`, `imageAlt: { fr, en }`, `github`, `category` (`frontend`, `backend`, `architecture` ou `ai`) et éventuellement `demo`. Placer les visuels dans `public/projects/` et référencer `projects/nom.webp` (chemin relatif au dossier public ; le préfixe Vite est ajouté automatiquement). Les cartes et filtres sont générés sans changer les composants. Utiliser uniquement des liens HTTPS de confiance. Le mode vide disparaît automatiquement.

## GitHub Pages — dépôt existant

Le dossier local reste `PORTOFOLIO` et le dépôt cible reste `Towrowrow/portofolio`. URL publique prévue : **https://towrowrow.github.io/portofolio/**. Aucun dépôt ni dossier n’est renommé ou créé. La branche principale indiquée par le suivi Git local est `master`.

- `vite.config.ts` utilise `base: '/portofolio/'` pour les bundles JavaScript et CSS.
- Le favicon utilise `%BASE_URL%` dans le HTML. Les images des futurs projets passent par `src/utils/assets.ts` avec `import.meta.env.BASE_URL` ; les URL externes sont préservées.
- Les traductions FR/EN sont importées depuis TypeScript et compilées dans le bundle : aucun téléchargement à la racine du domaine.
- La navigation est fondée sur des ancres (`#expertise`, `#ai`, etc.) qui conservent `/portofolio/`. Il n’existe pas de routes nécessitant un fallback serveur ou une page 404 personnalisée.
- Canonical, Open Graph et sitemap ciblent l’URL du sous-répertoire. `public/robots.txt` sera servi à `/portofolio/robots.txt` ; seul le propriétaire du site racine peut définir le robots.txt valable pour l’ensemble du domaine.

### Activer Pages

1. Envoyer les modifications de configuration dans le dépôt **existant** `Towrowrow/portofolio`, sur `master`, en conservant `package-lock.json`. Cette livraison ne pousse rien sur GitHub.
2. Ouvrir le dépôt → **Settings → Pages → Build and deployment**.
3. Dans **Source**, sélectionner **GitHub Actions**. Ne pas créer de branche `gh-pages` et ne pas sélectionner un dossier `/docs`.
4. Ouvrir **Actions → Deploy portfolio to GitHub Pages**. Le prochain push sur `master` déclenche le workflow ; pour déployer le code déjà présent, utiliser **Run workflow** avec la branche `master` après l’activation de Pages.
5. Attendre la réussite des jobs `build` et `deploy`, puis consulter **https://towrowrow.github.io/portofolio/**.

Le workflow exécute `npm ci`, `npm test` et `npm run build`, charge uniquement `dist/`, puis déploie avec l’environnement `github-pages` et les permissions Pages/OIDC. Si les règles du dépôt demandent une approbation de cet environnement, la valider dans Actions. Si la branche par défaut est changée ultérieurement, adapter `on.push.branches` dans `.github/workflows/deploy.yml`.

### Vérifier le build local sous le même chemin

```sh
npm test
npm run build
npm run preview
```

Ouvrir **http://127.0.0.1:4173/portofolio/** (ou le port affiché par Vite). Tester la bascule FR/EN, les ancres et le favicon. Les tests couvrent également les chemins des futurs visuels de projets. Ces commandes ne publient rien.

Vérification effectuée : 4 tests réussis, build TypeScript/Vite réussi, page de production chargée sous `/portofolio/`, bascule vers l’anglais et navigation vers `/portofolio/#expertise` fonctionnelles. Les bundles CSS/JS et le favicon utilisent le préfixe attendu ; aucune erreur ou alerte console relevée. Les futurs chemins d’images sont couverts par les tests (la liste de projets est actuellement vide). Le déploiement distant reste à activer dans les paramètres du dépôt.

## Qualité et limites éditoriales

Navigation clavier, lien d’évitement, boutons avec états accessibles, mises à jour annoncées pour les panneaux, images différées pour les futurs projets, responsive et mouvement réduit. Les tests portent sur le calcul d’expérience. Le build vérifie TypeScript et produit les fichiers optimisés. Le texte de présentation contient uniquement les informations fournies ; pas de clients, de métriques de performance ni d’expériences inventées.

Le contact propose GitHub et `mailto:towtowrow@gmail.com`. LinkedIn reste configurable. Aucun formulaire ne prétend envoyer de message.

## Vérification de cette version

- `npm test` : 2 tests réussis (date inconnue/invalide, anniversaire et date future).
- `npm run build` : compilation TypeScript et build Vite réussis.
- Serveur local : réponse HTTP 200.
- Navigateur : rendu desktop et mobile, sélection de couche backend, filtre backend, rôle Reviewer, bascule FR/EN et menu mobile vérifiés. Aucun débordement horizontal dans le viewport mobile contrôlé ; aucune erreur ou alerte de console relevée.
- La publication GitHub Pages n’a pas été exécutée. Aucun audit Lighthouse ni vérification sur appareil physique n’a été réalisé.

### Contrôles V2

Build de production et tests réussis. Rendu contrôlé dans le navigateur sur desktop, tablette et petits écrans (viewports demandés : 820, 390 et 320 px). Les débordements de grille et des éléments décoratifs identifiés ont été corrigés. Sélections Services/Database, agents Reviewer/Tester, bascule FR/EN, menu mobile et cible `mailto:` vérifiés. Aucune erreur ou alerte console relevée. Le mouvement réduit est pris en charge par MotionConfig et les règles CSS dédiées ; il n’a pas fait l’objet d’un audit avec lecteur d’écran. Aucune publication et aucune nouvelle dépendance.
