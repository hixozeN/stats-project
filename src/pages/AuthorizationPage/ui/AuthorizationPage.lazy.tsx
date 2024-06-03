import { lazy } from 'react';
import lazyRetry from 'shared/lib/lazyRetry/lazyRetry';

export const AuthorizationPageLazy = lazy(
  () => lazyRetry(
    () => import('./AuthorizationPage'),
    'AuthorizationPage',
  ),
);
