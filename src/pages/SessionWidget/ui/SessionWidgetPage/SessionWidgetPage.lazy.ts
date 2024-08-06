import { lazy } from 'react';
import lazyRetry from 'shared/lib/lazyRetry/lazyRetry';

export const SessionWidgetPageLazy = lazy(
  () => lazyRetry(
    () => import('./SessionWidgetPage'),
    'SessionWidgetPage',
  ),
);
