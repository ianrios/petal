import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Router } from './Router.tsx';
import './styles.css';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error('Petal root element was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <Router />
  </StrictMode>,
);
