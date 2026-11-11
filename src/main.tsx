import React from 'react';
import { hydrateRoot } from 'react-dom/client';

import { App, ErrorBoundary } from './App';

const root = document.getElementById('root');
if (!root) throw new Error('The application root is missing from the HTML template.');

hydrateRoot(
  root,
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
