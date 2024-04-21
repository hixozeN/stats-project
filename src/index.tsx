import { createRoot } from 'react-dom/client';
import { ThemeContextProvider } from 'app/providers/ThemeProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import 'app/styles/index.scss';

import 'shared/config/i18n/i18n';
import App from 'app/App';

const container = document.getElementById('root');
const root = createRoot(container);

if (!container) {
  throw new Error('Root container not found. Can\'t mount react app.');
}

root.render(
  <ErrorBoundary>
    <ThemeContextProvider>

      <App />

    </ThemeContextProvider>
  </ErrorBoundary>,
);
