import { lazy } from 'react';
import lazyRetry from 'shared/lib/lazyRetry/lazyRetry';

export const WidgetSettingsPageLazy = lazy(
  () => lazyRetry(
    () => import('./WidgetSettingsPage'),
    'WidgetSettingsPage',
  ),
);
