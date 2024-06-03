import { lazy } from 'react';
import lazyRetry from 'shared/lib/lazyRetry/lazyRetry';

export const OpenAuthPageLazy = lazy(
  () => lazyRetry(
    () => import('./OpenAuthPage'),
    'OpenAuthPage',
  ),
);
