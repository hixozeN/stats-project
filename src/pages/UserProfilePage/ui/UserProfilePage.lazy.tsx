import { lazy } from 'react';
import lazyRetry from 'shared/lib/lazyRetry/lazyRetry';

export const UserProfilePageLazy = lazy(
  () => lazyRetry(
    () => import('./UserProfilePage'),
    'UserProfilePage',
  ),
);
