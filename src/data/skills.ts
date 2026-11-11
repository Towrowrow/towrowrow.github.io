import type { Localized } from './profile';
export type Domain = 'frontend' | 'backend' | 'architecture' | 'ai';
export const expertise: {
  id: Domain;
  title: string;
  subtitle: Localized;
  description: Localized;
  stack: string[];
}[] = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    subtitle: { fr: 'L’interface, avec intention.', en: 'Interfaces, with intention.' },
    description: {
      fr: 'Applications React complexes, composants réutilisables et flux de données maîtrisés. Des interfaces réactives, accessibles et maintenables.',
      en: 'Complex React applications, reusable components and deliberate data flows. Responsive, accessible and maintainable interfaces.',
    },
    stack: [
      'React',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'GraphQL',
      'Apollo Client',
      'Relay',
      'React Hook Form',
      'Vite',
      'Storybook',
      'Jest',
      'React Testing Library',
    ],
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    subtitle: { fr: 'La robustesse, par conception.', en: 'Reliability, by design.' },
    description: {
      fr: 'APIs, logique métier et modèles de données. Des services cohérents, des intégrations fiables et une gestion explicite des erreurs.',
      en: 'APIs, business logic and data models. Cohesive services, reliable integrations and explicit error handling.',
    },
    stack: [
      'Node.js',
      'Express',
      'Go',
      'REST APIs',
      'GraphQL APIs',
      'MongoDB',
      'Mongoose',
      'PostgreSQL',
      'RabbitMQ',
      'Service integrations',
    ],
  },
  {
    id: 'architecture',
    title: 'Software Architecture',
    subtitle: { fr: 'Voir le système dans son ensemble.', en: 'See the whole system.' },
    description: {
      fr: 'Transformer les besoins métier en décisions techniques durables. Conception, tests, refactoring et livraison : la qualité sur tout le cycle logiciel.',
      en: 'Translate business needs into lasting technical decisions. Design, testing, refactoring and delivery: quality throughout the software lifecycle.',
    },
    stack: [
      'Software design',
      'Docker',
      'CI/CD',
      'Git',
      'Automated testing',
      'Code review',
      'Refactoring',
      'Technical documentation',
    ],
  },
  {
    id: 'ai',
    title: 'AI Agents & Automation',
    subtitle: {
      fr: 'Augmenter l’ingénierie. Garder le contrôle.',
      en: 'Augment engineering. Keep control.',
    },
    description: {
      fr: 'Concevoir des agents spécialisés et orchestrer des workflows utiles. Automatiser les tâches de développement avec des vérifications explicites.',
      en: 'Design specialized agents and orchestrate useful workflows. Automate development tasks with explicit verification.',
    },
    stack: [
      'OpenAI Codex',
      'Claude Code',
      'OpenCode',
      'Agent design',
      'Agentic workflows',
      'Developer automation',
    ],
  },
];
