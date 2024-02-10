/* eslint-disable no-unused-vars */
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import {
  createBrowserRouter,
} from 'react-router-dom';
import { NotFoundPage } from 'pages/NotFoundPage';
import { AuthorizationPage } from 'pages/AuthorizationPage';
import i18n from 'shared/config/i18n/i18n';
import { UserProfilePage } from 'pages/UserProfilePage';
import AppLayout from 'app/layouts/ui/AppLayout/AppLayout';
import { UserProfileForm } from 'entities/User';
import ReduxLayout from 'app/layouts/ReduxLayout/ReduxLayout';
import { TournamentsPage } from 'pages/TournamentsPage/index';
import { TeamPage } from 'shared/ui/Button/Button.stories';
import TeamsPage from 'pages/TeamsPage/ui/TeamsPage';
import { UserPage } from 'pages/UserPage';
import { AuthorizationLestaPage } from 'pages/AuthorizationLestaPage/AuthorizationLestaPage';

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  MATCHES = 'matches',
  TOURNAMENTS = 'tournaments',
  TEAMS = 'teams',
  FRIENDS = 'friends',
  AUTH = 'auth',
  AUTH_LESTA = 'authLesta',
  PROFILE = 'profile',
  USER = 'user',
  PROFILE_STATS = 'profile_stats',
  PROFILE_HISTORY = 'profile_history',
  PROFILE_EDIT = 'profile_edit',
  PROFILE_SETTINGS = 'profile_settings',
  PROFILE_BLACKLIST = 'profile_blacklist',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.NOT_FOUND]: '*',
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.MATCHES]: '/matches',
  [AppRoutes.TOURNAMENTS]: '/tournaments',
  [AppRoutes.TEAMS]: '/teams',
  [AppRoutes.FRIENDS]: '/friends',
  [AppRoutes.AUTH]: '/auth',
  [AppRoutes.AUTH_LESTA]: '/auth/lesta',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.USER]: '/user/:id',
  [AppRoutes.PROFILE_EDIT]: '/profile/edit',
  [AppRoutes.PROFILE_STATS]: '/profile/stats',
  [AppRoutes.PROFILE_HISTORY]: '/profile/history',
  [AppRoutes.PROFILE_SETTINGS]: '/profile/settings',
  [AppRoutes.PROFILE_BLACKLIST]: '/profile/blacklist',
};

export const routerConfiguration = createBrowserRouter([
  {
    element: <ReduxLayout />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: RoutePath.main,
            element: <MainPage />,
          },
          {
            path: RoutePath.user,
            element: <UserPage />,
          },
          {
            path: RoutePath.about,
            element: <AboutPage />,
          },
          {
            path: RoutePath.matches,
            element: <div>{i18n.t('Matches')}</div>,
          },
          {
            path: RoutePath.tournaments,
            element: <TournamentsPage />,
          },
          {
            path: RoutePath.teams,
            element: <TeamsPage />,
          },
          {
            path: RoutePath.friends,
            element: <div>{i18n.t('friends')}</div>,
          },
          {
            path: RoutePath.auth,
            element: <AuthorizationPage />,
          },
          {
            path: RoutePath.authLesta,
            element: <AuthorizationLestaPage />,
          },
          {
            path: RoutePath.profile,
            element: <UserProfilePage />,
            children: [
              {
                path: RoutePath.profile_edit,
                element: <UserProfileForm />,
              },
              {
                path: RoutePath.profile_stats,
                element: <div>{i18n.t('stats')}</div>,
              },
              {
                path: RoutePath.profile_history,
                element: <div>{i18n.t('history')}</div>,
              },
              {
                path: RoutePath.profile_settings,
                element: <div>{i18n.t('settings')}</div>,
              },
              {
                path: RoutePath.profile_blacklist,
                element: <div>{i18n.t('blacklist')}</div>,
              },
            ],
          },
          {
            path: RoutePath.not_found,
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
]);
