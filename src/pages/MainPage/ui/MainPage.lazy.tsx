import { lazy } from 'react';
import lazyRetry from 'shared/lib/lazyRetry/lazyRetry';

export const MainPageLazy = lazy(
  () => lazyRetry(
    () => import('./MainPage'),
    'MainPage',
  ),
);
