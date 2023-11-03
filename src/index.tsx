import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContextProvider } from 'app/providers/ThemeProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import App from './app/App';
import 'app/styles/index.scss';

import 'shared/config/i18n/i18n';

render(
  <BrowserRouter>
    <ErrorBoundary>
      <ThemeContextProvider>

        <App />

      </ThemeContextProvider>
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById('root'),
);
