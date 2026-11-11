import type { TranslationShape } from './types';

const fr = {
  nav: {
    expertise: 'Expertise',
    decisions: 'Décisions',
    playground: 'Laboratoires',
    build: 'Construction',
  },
  talk: 'Échangeons',
  project: 'Discuter d’un projet',
  discover: 'Découvrir mon expertise',
  menu: 'Menu de navigation',
  skip: 'Aller au contenu',
  back: 'Retour en haut',
  aboutLabel: 'DERRIÈRE LE CODE / 01',
  quote:
    'J’aime comprendre comment les choses fonctionnent. Mais ce qui me plaît encore davantage, c’est comprendre comment les rendre meilleures.',
  portrait: 'Portrait de Rémi Tilmant, développeur Full-Stack',
  personal: [
    'Je suis Rémi, développeur Full-Stack. Mon terrain principal est JavaScript et TypeScript, avec React côté interface, Node.js côté backend et une expérience en Go. J’aime intervenir sur une application dans son ensemble, pour relier les décisions techniques aux besoins réels.',
    'Ce qui m’intéresse : comprendre un problème, explorer les solutions possibles et construire quelque chose de solide, d’utile et de durable. L’architecture m’aide à rendre les responsabilités claires et les logiciels plus faciles à faire évoluer.',
    'J’expérimente aussi des workflows d’agents IA, avec des tâches délimitées, des validations et des revues. J’ai pris l’initiative d’organiser des moments de partage autour de leurs usages concrets. Pour moi, un bon outil aide avant tout à mieux décider et à produire un logiciel de meilleure qualité.',
  ],
  personalYears: 'années à relier interfaces, services et données.',
  expertLabel: 'FULL-STACK ENGINEERING / 03',
  expertTitle: 'Deux profondeurs.\nUne seule exigence.',
  expertIntro:
    'Des interfaces aux services : comprendre le système et soigner chacune de ses frontières.',
  toolkit: 'Explorer ma boîte à outils',
  all: 'Tout',
  foundation: 'LE SOCLE COMMUN',
  foundationText: 'Architecture · Tests · Code review · CI/CD · Documentation',
  architectureLabel: 'ARCHITECTURE EXPLORER / 04',
  architectureTitle: 'Lire le système.\nComprendre ses frontières.',
  architectureNote: 'Architecture conceptuelle · aucun backend exécuté ici.',
  buildLabel: 'BEHIND THE BUILD / 07',
  realProject: 'PROJET PERSONNEL / CE PORTFOLIO',
  buildTitle: 'Le projet que vous\nêtes en train d’explorer.',
  buildText:
    'Une interface React et TypeScript, pré-rendue en français et en anglais. Des interactions locales, des états explicites et une publication statique sur GitHub Pages.',
  buildTruth:
    'Pas de serveur applicatif en production. Node.js intervient dans les outils de build ; Go, les APIs et les bases de données apparaissent dans mon expertise et dans des schémas pédagogiques, pas dans un backend fictif.',
  code: 'Explorer le vrai code',
  buildSteps: [
    ['CONCEPTION', 'React + TypeScript', 'Composants, données et responsabilités'],
    ['PRODUCTION', 'Vite → HTML FR / EN', 'Pré-rendu, SEO et assets partagés'],
    ['VÉRIFICATION', 'Tests → GitHub Actions', 'Types, machines à états et HTML final'],
    ['PUBLICATION', 'GitHub Pages', 'HTTPS et contenu statique'],
  ],
  realDecision: 'CHOIX RÉEL',
  realDecisionText:
    'Rendre le contenu lisible avant JavaScript, puis enrichir l’expérience sans le masquer.',
  contactLabel: 'LA PROCHAINE CONVERSATION / 08',
  contactTitle: 'Du recul.\nDu concret.\nParlons logiciel.',
  recruitment: 'RECRUTEMENT',
  recruitmentText:
    'Vous recherchez un développeur expérimenté pour concevoir, décider et faire évoluer vos applications ?',
  mission: 'PROJET',
  missionText:
    'Une application à concevoir, moderniser ou faire évoluer ? Échangeons sur vos besoins.',
  cv: 'Télécharger mon CV',
  hero: {
    eyebrow: 'SENIOR FULL-STACK ENGINEER / LEAD DEVELOPER',
    heroText:
      'Je conçois et développe des logiciels complets. Une même exigence côté frontend et backend, amplifiée par les agents IA.',
    explore: 'Découvrir mon expertise',
    contact: 'Discuter d’un projet',
    years: 'ans d’expérience',
    scroll: 'DÉFILER POUR EXPLORER',
    error: 'Le portfolio n’a pas pu s’afficher.',
    retry: 'Recharger',
  },
} as const;

const en = {
  nav: {
    expertise: 'Expertise',
    decisions: 'Decisions',
    playground: 'Labs',
    build: 'The build',
  },
  talk: 'Let’s talk',
  project: 'Discuss a project',
  discover: 'Discover my expertise',
  menu: 'Navigation menu',
  skip: 'Skip to content',
  back: 'Back to top',
  aboutLabel: 'BEHIND THE CODE / 01',
  quote:
    'I enjoy understanding how things work. What I enjoy even more is figuring out how to make them better.',
  portrait: 'Portrait of Rémi Tilmant, Full-Stack developer',
  personal: [
    'I’m Rémi, a Full-Stack developer. I work primarily in JavaScript and TypeScript, with React on the frontend, Node.js on the backend and experience in Go. I enjoy working across an application, connecting technical decisions to real needs.',
    'What draws me in is understanding a problem, exploring the options and building something useful, reliable and lasting. Architecture helps me make responsibilities clear and software easier to change.',
    'I also experiment with AI agent workflows, using bounded tasks, validation and reviews. I’ve taken the initiative to organise knowledge-sharing sessions about their practical uses. To me, a good tool helps developers make better decisions and build better software.',
  ],
  personalYears: 'years connecting interfaces, services and data.',
  expertLabel: 'FULL-STACK ENGINEERING / 03',
  expertTitle: 'Two areas of depth.\nOne engineering standard.',
  expertIntro:
    'From interfaces to services: understand the system and take care of every boundary.',
  toolkit: 'Explore my engineering toolkit',
  all: 'All',
  foundation: 'THE SHARED FOUNDATION',
  foundationText: 'Architecture · Testing · Code review · CI/CD · Documentation',
  architectureLabel: 'ARCHITECTURE EXPLORER / 04',
  architectureTitle: 'Read the system.\nUnderstand its boundaries.',
  architectureNote: 'Conceptual architecture · no backend is running here.',
  buildLabel: 'BEHIND THE BUILD / 07',
  realProject: 'PERSONAL PROJECT / THIS PORTFOLIO',
  buildTitle: 'The project you’re\nexploring right now.',
  buildText:
    'A React and TypeScript interface, prerendered in French and English. Local interactions, explicit states and static publishing on GitHub Pages.',
  buildTruth:
    'No application server runs in production. Node.js powers the build tools; Go, APIs and databases feature in my expertise and educational diagrams, not in an invented backend.',
  code: 'Explore the actual code',
  buildSteps: [
    ['DESIGN', 'React + TypeScript', 'Components, data and responsibilities'],
    ['PRODUCTION', 'Vite → FR / EN HTML', 'Prerendering, SEO and shared assets'],
    ['VERIFICATION', 'Tests → GitHub Actions', 'Types, state machines and final HTML'],
    ['PUBLISHING', 'GitHub Pages', 'HTTPS and static content'],
  ],
  realDecision: 'A REAL DESIGN DECISION',
  realDecisionText:
    'Make the content readable before JavaScript, then enhance the experience without hiding it.',
  contactLabel: 'THE NEXT CONVERSATION / 08',
  contactTitle: 'Perspective.\nPracticality.\nLet’s talk software.',
  recruitment: 'HIRING',
  recruitmentText:
    'Looking for an experienced developer who can design, make technical decisions and evolve your applications?',
  mission: 'PROJECT',
  missionText:
    'An application to build, modernise or develop further? Let’s discuss what you need.',
  cv: 'Download my CV',
  hero: {
    eyebrow: 'SENIOR FULL-STACK ENGINEER / LEAD DEVELOPER',
    heroText:
      'I design and build complete software. Equal depth in frontend and backend engineering, amplified by AI agents.',
    explore: 'Discover my expertise',
    contact: 'Discuss a project',
    years: 'years of experience',
    scroll: 'SCROLL TO EXPLORE',
    error: 'The portfolio could not be displayed.',
    retry: 'Reload',
  },
} as const satisfies TranslationShape<typeof fr>;

export const siteMessages = { fr, en };
export type SiteMessages = TranslationShape<typeof fr>;
