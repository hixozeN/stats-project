import { render } from 'react-dom';
import { StoreProvider } from 'app/providers/StoreProvider/index';
import { RouterProvider } from 'react-router-dom';
import { ThemeContextProvider } from 'app/providers/ThemeProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import 'app/styles/index.scss';

import 'shared/config/i18n/i18n';
import { routerConfiguration } from 'shared/config/routeConfig/routeConfig';
import Loader from 'shared/ui/Loader/Loader';

render(
  <StoreProvider>
    <ErrorBoundary>
      <ThemeContextProvider>

        <RouterProvider fallbackElement={<Loader />} router={routerConfiguration} />

      </ThemeContextProvider>
    </ErrorBoundary>
  </StoreProvider>,
  document.getElementById('root'),
);
