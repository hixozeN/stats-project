/* eslint-disable no-unused-vars */
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { createBrowserRouter } from 'react-router-dom';
import { NotFoundPage } from 'pages/NotFoundPage';
import { AuthorizationPage } from 'pages/AuthorizationPage';
import i18n from 'shared/config/i18n/i18n';
import { UserProfilePage } from 'pages/UserProfilePage';
import {
  RouterUtils, ReduxLayout, AppLayout, RequireAuth, UserHOC,
} from 'layouts';
import { TournamentsPage } from 'pages/TournamentsPage';
import { TeamsPage } from 'pages/TeamsPage';
import { TeamPage } from 'pages/TeamPage';
import { UserPage } from 'pages/UserPage';
import { AuthorizationLestaPage } from 'pages/AuthorizationLestaPage/AuthorizationLestaPage';
import { OpenAuthPage } from 'pages/OpenAuthPage';
import { UserProfileForm } from 'features/editCurrentUserPorfile';
import { RatingPage } from 'pages/RatingPage';
import { AuthLestaResult } from 'pages/AuthorizationLestaPage/AuthLestaResult';
import { SessionWidgetPage, WidgetSettingsPage } from 'pages/SessionWidget';

// interface IRouterPath {
//   [key:string]: string;
// }

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  MATCHES = 'matches',
  TOURNAMENTS = 'tournaments',
  RATING = 'rating',
  TEAMS = 'teams',
  TEAM = 'team',
  FRIENDS = 'friends',
  AUTH = 'auth',
  AUTH_LESTA = 'authLesta',
  AUTH_LESTA_RESULT = 'authLestaResult',
  AUTH_CONNECT_LESTA = 'connectLesta',
  USER_ID = 'user_id',
  PROFILE = 'profile',
  USER = 'user',
  PROFILE_STATS = 'profile_stats',
  PROFILE_SESSIONS = 'profile_sessions',
  PROFILE_HISTORY = 'profile_history',
  PROFILE_EDIT = 'profile_edit',
  PROFILE_SETTINGS = 'profile_settings',
  PROFILE_BLACKLIST = 'profile_blacklist',
  SESSION_WIDGET = 'session_widget',
  SESSION_WIDGET_SETTINGS = 'session_widget_settings',
  NOT_FOUND = 'not_found',
}

export const RoutePath: OptionalRecord<AppRoutes, string> = {
  [AppRoutes.NOT_FOUND]: '*',
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.MATCHES]: '/matches',
  [AppRoutes.TOURNAMENTS]: '/tournaments',
  [AppRoutes.RATING]: '/rating',
  [AppRoutes.TEAMS]: '/teams',
  [AppRoutes.TEAM]: '/team/:clanId',
  [AppRoutes.FRIENDS]: '/friends',
  [AppRoutes.AUTH]: '/auth',
  [AppRoutes.AUTH_LESTA]: '/auth/lesta',
  [AppRoutes.AUTH_LESTA_RESULT]: '/auth/lesta/result',
  [AppRoutes.USER_ID]: '/user',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.USER]: '/user/:id',
  [AppRoutes.PROFILE_EDIT]: '/profile/edit',
  [AppRoutes.PROFILE_STATS]: '/profile/stats',
  [AppRoutes.PROFILE_SESSIONS]: '/profile/sessions',
  [AppRoutes.PROFILE_HISTORY]: '/profile/history',
  [AppRoutes.PROFILE_SETTINGS]: '/profile/settings',
  [AppRoutes.PROFILE_BLACKLIST]: '/profile/blacklist',
  [AppRoutes.AUTH_CONNECT_LESTA]: '/auth/connect',
  [AppRoutes.SESSION_WIDGET]: '/widgets/session',
  [AppRoutes.SESSION_WIDGET_SETTINGS]: '/widgets',
};

export const routerConfiguration = createBrowserRouter([
  {
    element: <RouterUtils />,
    children: [
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
                path: RoutePath.user_id,
                element: <UserHOC />,
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
                path: RoutePath.rating,
                element: <RatingPage />,
              },
              {
                path: RoutePath.teams,
                element: <TeamsPage />,
              },
              {
                path: RoutePath.session_widget_settings,
                element: <WidgetSettingsPage />,
              },
              {
                path: RoutePath.team,
                element: <TeamPage />,
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
                path: RoutePath.authLestaResult,
                element: <AuthLestaResult />,
              },
              {
                element: <RequireAuth />,
                children: [
                  {
                    path: RoutePath.connectLesta,
                    element: <OpenAuthPage />,
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
                        element: <div>{i18n.t('Данный раздел находится в разработке \uD83D\uDEE0')}</div>,
                      },
                      {
                        path: RoutePath.profile_sessions,
                        element: <div>{i18n.t('Данный раздел находится в разработке \uD83D\uDEE0')}</div>,
                      },
                    ],
                  },
                ],
              },
              {
                path: RoutePath.not_found,
                element: <NotFoundPage />,
              },
            ],
          },
          {
            path: RoutePath.session_widget,
            element: <SessionWidgetPage />,
          },
        ],
      },
    ],
  },
]);
