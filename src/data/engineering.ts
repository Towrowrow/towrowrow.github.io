import { Braces, Code2, Database, Layers3 } from 'lucide-react';

export const layers = [
  {
    name: 'Frontend',
    icon: Code2,
    stack: ['React', 'TypeScript', 'Apollo / Relay'],
    role: { fr: 'L’expérience utilisateur', en: 'The user experience' },
    body: {
      fr: 'Transformer les besoins métier en interfaces accessibles et réactives. Structurer les composants et rendre les flux de données explicites.',
      en: 'Translate business needs into accessible, responsive interfaces. Structure components and make data flows explicit.',
    },
    contract: 'UI → GraphQL / REST',
  },
  {
    name: 'API',
    icon: Braces,
    stack: ['REST', 'GraphQL', 'Express'],
    role: { fr: 'Le contrat entre les couches', en: 'The contract between layers' },
    body: {
      fr: 'Définir des contrats lisibles, valider les entrées et traduire les erreurs. Découpler les besoins de l’interface des détails des services.',
      en: 'Define clear contracts, validate inputs and translate errors. Decouple interface needs from service implementation details.',
    },
    contract: 'Request → validation → response',
  },
  {
    name: 'Services',
    icon: Layers3,
    stack: ['Node.js', 'Go', 'RabbitMQ'],
    role: { fr: 'La logique métier', en: 'The business logic' },
    body: {
      fr: 'Isoler les règles métier, définir les responsabilités et fiabiliser les échanges entre services. Garder les intégrations testables et les erreurs maîtrisées.',
      en: 'Isolate business rules, define responsibilities and make service communication reliable. Keep integrations testable and errors explicit.',
    },
    contract: 'Domain → events → integrations',
  },
  {
    name: 'Database',
    icon: Database,
    stack: ['PostgreSQL', 'MongoDB', 'Mongoose'],
    role: { fr: 'La cohérence des données', en: 'Data consistency' },
    body: {
      fr: 'Modéliser le domaine avant de choisir la persistance. Adapter les structures et les accès aux besoins, avec une attention à la cohérence et à la maintenabilité.',
      en: 'Model the domain before choosing persistence. Fit structures and access patterns to actual needs, with attention to consistency and maintainability.',
    },
    contract: 'Model → query → persistence',
  },
];
