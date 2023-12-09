import { lazy } from 'react';

export const UserProfilePageLazy = lazy(() => new Promise((resolve) => {
  // @ts-ignore
  setTimeout(() => resolve(import('./UserProfilePage')), 500);
}));
