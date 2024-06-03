import { lazy } from 'react';
import lazyRetry from 'shared/lib/lazyRetry/lazyRetry';

export const RatingPageLazy = lazy(
  () => lazyRetry(
    () => import('./RatingPage'),
    'RatingPage',
  ),
);
