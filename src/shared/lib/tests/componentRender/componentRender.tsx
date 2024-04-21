import { ReactNode, Suspense } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';
import { JestStoreProvider } from './JestStoreProvider';

export interface ComponentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
}

export function componentRender(component: ReactNode, options: ComponentRenderOptions = {}) {
  const { route = '/', initialState } = options;

  return render(
    <MemoryRouter initialEntries={[route]}>
      <JestStoreProvider initialState={initialState}>
        <I18nextProvider i18n={i18nForTests}>
          <Suspense fallback="">
            {component}
          </Suspense>
        </I18nextProvider>
      </JestStoreProvider>
    </MemoryRouter>,
  );
}
