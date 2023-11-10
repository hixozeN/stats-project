import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { RouteProps } from 'react-router-dom';
import { NotFoundPage } from 'pages/NotFoundPage';
import { AuthorizationPage } from 'pages/AuthorizationPage';
import i18n from 'shared/config/i18n/i18n';

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  MATCHES = 'matches',
  TOURNAMENTS = 'tournaments',
  TEAMS = 'teams',
  FRIENDS = 'friends',
  AUTH = 'auth',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.MATCHES]: '/matches',
  [AppRoutes.TOURNAMENTS]: '/tournaments',
  [AppRoutes.TEAMS]: '/teams',
  [AppRoutes.FRIENDS]: '/friends',
  [AppRoutes.AUTH]: '/auth',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage />,
  },
  [AppRoutes.MATCHES]: {
    path: RoutePath.matches,
    element: <div>{i18n.t('Matches')}</div>,
  },
  [AppRoutes.TOURNAMENTS]: {
    path: RoutePath.tournaments,
    element: <div>{i18n.t('tournaments')}</div>,
  },
  [AppRoutes.TEAMS]: {
    path: RoutePath.teams,
    element: <div>{i18n.t('teams')}</div>,
  },
  [AppRoutes.FRIENDS]: {
    path: RoutePath.friends,
    element: <div>{i18n.t('friends')}</div>,
  },
  [AppRoutes.AUTH]: {
    path: RoutePath.auth,
    element: <AuthorizationPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
