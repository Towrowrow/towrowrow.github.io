# SEO et Google Search Console

## Favicon personnel — V2.1 locale

Le monogramme `RT.` remplace les chevrons de code, avec un fond `#101815` et des lettres `#F0EEE6`. Le nom complet reste inchangé dans la navigation, le Hero, les titres et les données structurées.

Les deux pages pré-rendues déclarent les mêmes ressources à la racine :

- `/favicon.ico` : entrées 16, 32 et 48 pixels.
- `/favicon-96x96.png` : version raster carrée pour les surfaces de recherche.
- `/favicon.svg` : tracés vectoriels autonomes, sans police distante.
- `/apple-touch-icon.png` : 180 × 180 pixels.

Des PNG 16/32/48 sont également disponibles. Aucun manifeste PWA n’est ajouté, car le portfolio n’a pas de fonctionnalité d’installation à déclarer. Les tests vérifient les dimensions réelles des images, le contenu de l’ICO et les déclarations dans le build FR/EN.

Les [recommandations officielles Google](https://developers.google.com/search/docs/appearance/favicon-in-search) demandent une icône carrée, au moins 8 × 8, et recommandent une taille supérieure à 48 × 48. Le PNG 96 × 96 répond à cette recommandation. Les chemins restent stables et `robots.txt` autorise l’exploration.

**Avant déploiement :** les nouvelles ressources sont vérifiées dans `dist/` et via le serveur local. La V2 publique continue normalement de servir son ancien favicon. Les titres, descriptions, canoniques, hreflang, Open Graph, données Person, sitemap et fichier Google de validation sont conservés.

**Après un futur déploiement autorisé :** vérifier les réponses HTTP 200 et les types MIME sur les quatre URL ci-dessus, ainsi que leurs liens dans `/` et `/en/`. Dans Search Console, inspecter l’accueil et demander une nouvelle indexation si nécessaire. Google décide de la prochaine exploration et de l’affichage du favicon ; aucune mise à jour immédiate ni présence garantie ne peut être annoncée.

## Implémentation

- URL française : https://towrowrow.github.io/
- URL anglaise : https://towrowrow.github.io/en/
- `src/data/seo.ts` centralise les titres, descriptions, URL et données Schema.org `Person`. Aucune entreprise, localisation, certification ou expérience non fournie n’est ajoutée. Le schéma référence uniquement le nom, le métier, les compétences, le site, le GitHub et l’email professionnel déjà publics.
- Le build Vite navigateur est suivi d’un rendu React au moment du build. `scripts/prerender.mjs` génère deux documents HTML complets et le sitemap. Aucun serveur applicatif n’est nécessaire sur GitHub Pages.
- Le contenu statique est visible sans JavaScript. Avec JavaScript, React reprend les interactions et animations existantes. Le changement de langue utilise des liens explorables et une URL stable ; aucune redirection automatique fondée sur la langue ou le stockage local.
- Canonical propre à chaque langue, `hreflang` réciproques FR/EN et `x-default`, `lang`, Open Graph, Twitter Card, image de partage PNG 1200 × 630 et JSON-LD sont présents dans le HTML livré.
- `robots.txt` autorise l’exploration et référence le sitemap définitif. Aucun `noindex` n’est ajouté. Les tests du build vérifient ces propriétés, la visibilité du contenu et l’unicité du H1.
- Pas de mots-clés cachés, de fausses réalisations ni de promesse de classement. Le schéma Person ne garantit pas un résultat enrichi.

## Validation manuelle Google Search Console

Il n’existe pas de connexion Search Console autorisée dans cet environnement. La validation nécessite votre compte Google et le jeton propre à votre propriété. Aucun jeton fictif n’a été ajouté.

1. Ouvrir https://search.google.com/search-console/ et se connecter avec le compte Google destiné à gérer le site.
2. Choisir **Ajouter la propriété → Préfixe de l’URL** et saisir exactement `https://towrowrow.github.io/`. Cette méthode évite une validation DNS que vous ne contrôlez pas sur le domaine `github.io`.
3. Choisir la méthode **Fichier HTML**. Télécharger le fichier `googleXXXXXXXXXXXXXXXX.html` fourni par Google, sans en modifier le nom ni le contenu.
4. Ajouter ce fichier dans `public/` de ce projet, le commiter puis le pousser sur `master` du dépôt `Towrowrow/towrowrow.github.io`. Après le workflow vert, vérifier qu’il est accessible à `https://towrowrow.github.io/googleXXXXXXXXXXXXXXXX.html`.
5. Revenir dans Search Console et cliquer **Valider**. Conserver le fichier lors des déploiements futurs : Google peut revérifier la propriété.
6. Dans **Sitemaps**, soumettre `sitemap.xml`, soit `https://towrowrow.github.io/sitemap.xml`. Contrôler le statut et les éventuelles erreurs de lecture.
7. Dans **Inspection de l’URL**, inspecter `https://towrowrow.github.io/`, lancer **Tester l’URL publiée**, vérifier le HTML/rendu puis **Demander une indexation**. Répéter pour `https://towrowrow.github.io/en/`.
8. Surveiller **Indexation → Pages**, l’inspection de chaque URL et, lorsque les données arrivent, les impressions/clics dans **Performances**. Une demande envoyée ou un sitemap accepté ne signifie pas que la page est indexée.

Alternative : Google peut proposer une balise `google-site-verification`. Si cette méthode est retenue, ajouter la balise exacte dans le `<head>` de `index.html` ; le pré-rendu la conserve pour les deux langues. Ne jamais utiliser un jeton inventé ni retirer la vérification après validation.

## Vérifications

`npm test` vérifie l’expérience et les chemins d’assets. `npm run build` compile TypeScript, produit le site statique et exécute les contrôles SEO sur le HTML final. Les mesures Lighthouse locales sont des mesures de laboratoire : elles ne remplacent ni les données réelles de Core Web Vitals ni une vérification manuelle avec lecteur d’écran. L’indexation et le classement restent à confirmer dans votre Search Console.

Résultats du contrôle local du 11 novembre 2026 : 5 tests unitaires et 3 contrôles SEO du HTML final réussis. Lighthouse mobile : performance 100/100, accessibilité 95/100, bonnes pratiques 100/100 et SEO 100/100. Le libellé accessible de la langue inclut maintenant FR/EN ; la contre-vérification confirme la disparition du signalement de libellé. Le signalement restant de contraste vise uniquement le filigrane décoratif « Hello. », déjà `aria-hidden`, conservé pour respecter le design. Ces scores ne constituent pas une garantie de classement Google. Les bundles partagés restent autour de 123 Ko de JavaScript et 11 Ko de CSS compressés, sans dépendance supplémentaire en production.

## Références officielles

- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/specialty/international/localized-versions
- https://support.google.com/webmasters/answer/9008080
- https://support.google.com/webmasters/answer/7451001
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
