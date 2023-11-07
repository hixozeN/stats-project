import { lazy } from 'react';

export const AuthorizationPageLazy = lazy(() => new Promise((resolve) => {
  // @ts-ignore
  setTimeout(() => resolve(import('./AuthorizationPage')), 500);
}));
