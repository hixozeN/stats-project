import { lazy } from 'react';
import lazyRetry from 'shared/lib/lazyRetry/lazyRetry';

export const WN8PageLazy = lazy(
  () => lazyRetry(
    () => import('./WN8Page'),
    'WN8Page',
  ),
);
