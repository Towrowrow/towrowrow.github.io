# Portfolio V2.1 — revue locale

12 novembre 2026. Travail local uniquement : aucun commit, push, merge ou déploiement.

## Audit et choix

La V2 disposait déjà d’interactions et de conséquences cohérentes. Son point faible pour un visiteur non technique était le passage des titres éditoriaux aux mécanismes : peu de contexte métier, aucune première manipulation conseillée et des termes comme API, file ou projection optimiste peu expliqués.

La V2.1 ajoute une entrée en matière aux quatre laboratoires : contexte, action à essayer, résultat à observer et compétences professionnelles. Un détail technique facultatif complète cette première lecture sans imposer un tutoriel. Ce contenu est rendu en HTML, reste disponible sans JavaScript et utilise les mêmes clés françaises et anglaises vérifiées par TypeScript.

- Engineering Decisions : enregistrer un document malgré une panne de notification ; comparer processus commun, dépendances synchrones et envoi différé.
- Architecture Explorer : suivre une demande entre interface, API, services et données ; comprendre les responsabilités sans prétendre déployer quatre services réels.
- Playground : distinguer ce qui apparaît à l’écran de ce qui est confirmé ; expliquer refus, conflit, reprise et réponse obsolète.
- AI Lab : cadrage, rôles spécialisés, livrables préparés, boucle de diagnostic et décision humaine. La simulation locale reste explicitement identifiée.

Les modèles, scénarios et reducers n’ont pas été modifiés. Le Hero, le portrait discret, la palette, les compositions, les animations et les liens existants sont conservés. Le profil et ses sept années d’expérience restent inchangés. Aucun changement de LinkedIn, nouvel employeur, client, projet ou information personnelle n’a été ajouté.

## Favicon

Monogramme `RT.` sur anthracite `#101815`, lettres crème `#F0EEE6`. Il s’agit de tracés vectoriels originaux, sans police externe. Le nom complet reste l’identité principale du portfolio.

- `public/favicon.svg` : vectoriel autonome.
- `public/favicon.ico` : images distinctes 16/32/48.
- `public/favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png`, `favicon-96x96.png`.
- `public/apple-touch-icon.png` : 180 × 180.
- `scripts/generate_favicons.py` : utilitaire d’auteur facultatif, Python/Pillow déjà disponibles pour la génération. Aucune dépendance npm ni étape CI ajoutée.

Le SVG et les rasters partagent les mêmes coordonnées. Les tailles natives ont été inspectées, notamment 16 et 32 pixels. La planche de contrôle `preview-v2-favicons.png` est locale et ignorée par Git. Aucun manifeste n’est ajouté, faute de fonctionnalité d’installation à déclarer.

## SEO et production

Le HTML FR/EN déclare ICO, PNG 96, SVG et icône Apple avec leurs tailles et types. Les chemins commencent par `/` dans les deux versions et fonctionnent avec la base Vite `/`.

Comparaison avec le build V2 : titres, descriptions, canoniques, hreflang, Open Graph, Twitter et données Person inchangés ; seules les déclarations d’icônes évoluent. Le sitemap, robots.txt et le fichier de validation Google sont préservés. Les guides sont présents dans le HTML pré-rendu et aucun `noindex` ni masquage initial du contenu n’est ajouté.

L’audit en lecture seule de la production confirme que `/`, `/en/`, `/favicon.svg` et `/robots.txt` répondent HTTP 200. La production sert toujours le favicon V2, ce qui est attendu. Les nouvelles icônes sont contrôlées dans `public/`, `dist/` et sur le serveur local ; leur accessibilité publique devra être vérifiée après un futur déploiement autorisé. Voir [SEO.md](SEO.md).

Google recommande une icône carrée supérieure à 48 pixels ; le PNG 96 répond à cette recommandation. Son affichage et son délai de mise à jour dans les résultats restent à la décision de Google, après exploration. Aucun résultat immédiat n’est promis.

## Vérifications

- Prettier, ESLint et TypeScript : réussis. Des fins de ligne Windows étaient présentes dans le checkout ; elles ont été normalisées par le formateur, sans changement sémantique des fichiers concernés.
- `npm test` : 33 tests réussis, dont trois nouveaux contrôles des dimensions PNG, des entrées ICO et de l’autonomie du SVG.
- `npm run build` : réussi ; quatre tests de sortie réussis, dont la présence des quatre guides FR/EN, les déclarations favicon, la copie des assets et la préservation de la validation Google. Total : 37 tests.
- Engineering Decisions : panne avec file activée, conséquences attendues vérifiées dans l’interface.
- Playground : succès, refus, conflit réappliqué, reprise et réponse A ignorée après B vérifiés.
- Architecture Explorer : sélection des couches et annonce du détail conservées.
- AI Lab : trois scénarios parcourus jusqu’à la validation humaine, avec diagnostic pour la régression.
- Détails pédagogiques ouverts et refermés au clavier.
- Responsive : FR à 320/360/390/430/768/1024/1440 ; EN à 320/390/768/1440. Aucun débordement horizontal ; portrait conservé à 112 px sur mobile, 210 px sur desktop.
- Lighthouse local FR et EN : 100 en performance, accessibilité, bonnes pratiques et SEO. Audit EN avec mouvements réduits. Ces scores sont des mesures locales automatisées, pas une garantie en production ni une certification d’accessibilité.

### Point de vigilance

Un message React d’hydratation a été observé une fois dans la première session de manipulation. Il n’a pas été reproduit sur une ouverture neuve ni lors de quatre bascules FR/EN ; les deux audits Lighthouse ne signalent aucune erreur console. Sa cause n’est pas établie. Ne pas présenter ce signal comme un défaut corrigé ; le surveiller lors de la validation avant publication.

## Fichiers concernés

- Intégration : `src/App.tsx`, `src/components/ArchitectureExplorer.tsx`, compositions des trois fonctionnalités dans `src/features/`.
- Ajouts pédagogiques : `src/components/LabGuide.tsx`, `src/i18n/labGuidance.ts`, `src/styles/lab-guide.css`.
- Identité : `index.html`, fichiers favicon de `public/`, `scripts/generate_favicons.py`.
- Tests : `tests/unit/favicons.test.mjs`, `tests/seo-build.test.mjs`.
- Documentation : `README.md`, `SEO.md`, ce rapport.

Le workflow, les dépendances, les données de profil et la logique des simulations sont inchangés. Les captures et audits locaux restent exclus du repository. Aucun autre repository n’est concerné.

## À valider

Aperçu : http://127.0.0.1:4173/#decisions ; anglais : http://127.0.0.1:4173/en/.

Valider les explications et l’identité favicon avant toute publication. Après autorisation de déploiement seulement : contrôler les nouvelles icônes en HTTPS, les types MIME, les pages FR/EN et les consoles, puis demander une exploration de l’accueil dans Search Console si souhaité.
