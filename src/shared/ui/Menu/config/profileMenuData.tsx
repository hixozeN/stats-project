import { ReactElement } from 'react';
import StatsIcon from 'shared/assets/icons/stats.svg';
import HistoryIcon from 'shared/assets/icons/history.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import SettingsIcon from 'shared/assets/icons/settings.svg';
import BlacklistIcon from 'shared/assets/icons/blacklist.svg';
import LogoutIcon from 'shared/assets/icons/logout2.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export interface MenuData {
  name: string;
  path: string;
  icon: ReactElement;
}

export type MenuTheme =
  | 'navbar'
  | 'profileSidebar'
  | 'userSidebar'
  | 'adminSidebar';

export const getMenuElements = (module: MenuTheme) => {
  const data = {
    stat: {
      name: 'Статистика',
      path: RoutePath.profile_stats,
      icon: <StatsIcon />,
    },
    history: {
      name: 'История матчей',
      path: RoutePath.profile_history,
      icon: <HistoryIcon />,
    },
    user: {
      name: 'Профиль',
      path: RoutePath.user_id,
      icon: <ProfileIcon />,
    },
    edit: {
      name: 'Настройки',
      path: RoutePath.profile_edit,
      icon: <SettingsIcon />,
    },
    blacklist: {
      name: 'Черный список',
      path: RoutePath.profile_blacklist,
      icon: <BlacklistIcon />,
    },
    sessions: {
      name: 'История сессий',
      path: RoutePath.profile_sessions,
      icon: <HistoryIcon />,
    },
    logaut: {
      name: 'Выйти из аккаунта',
      path: RoutePath.main,
      icon: <LogoutIcon />,
    },
  };

  const elements = {
    profileSidebar: [data.sessions, data.blacklist, data.edit],
    navbar: [data.user, data.sessions, data.blacklist, data.edit, data.logaut],
    userSidebar: [data.logaut],
    adminSidebar: [data.logaut],
  };

  return elements[module];
};
