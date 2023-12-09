import { Suspense } from 'react';
import { render } from 'react-dom';
import { StoreProvider } from 'app/providers/StoreProvider/index';
import { RouterProvider, Routes } from 'react-router-dom';
import { ThemeContextProvider } from 'app/providers/ThemeProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import 'app/styles/index.scss';

import 'shared/config/i18n/i18n';
import { routerConfiguration } from 'shared/config/routeConfig/routeConfig';
import Loader from 'shared/ui/Loader/Loader';
import { PageLoader } from 'widgets/PageLoader/index';
import App from './app/App';

render(
  <StoreProvider>
    {/* <BrowserRouter> */}

    <ErrorBoundary>
      <ThemeContextProvider>

        <RouterProvider fallbackElement={<Loader />} router={routerConfiguration} />

      </ThemeContextProvider>
    </ErrorBoundary>
    {/* </BrowserRouter> */}
  </StoreProvider>,
  document.getElementById('root'),
);
