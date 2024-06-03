import { lazy } from 'react';
import lazyRetry from 'shared/lib/lazyRetry/lazyRetry';

export const UserPageLazy = lazy(
  () => lazyRetry(
    () => import('./UserPage'),
    'UserPage',
  ),
);
