import { ReactElement } from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import StatsIcon from 'shared/assets/icons/stats.svg';
import HistoryIcon from 'shared/assets/icons/history.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import SettingsIcon from 'shared/assets/icons/settings.svg';
import BlacklistIcon from 'shared/assets/icons/blacklist.svg';
import LogoutIcon from 'shared/assets/icons/logout2.svg';
import HomeIcon from 'shared/assets/icons/Sidebar/home.svg';
import MatchIcon from 'shared/assets/icons/Sidebar/matches.svg';
import TournamentIcon from 'shared/assets/icons/Sidebar/tournaments.svg';
import TeamsIcon from 'shared/assets/icons/Sidebar/teams.svg';
import FriendIcon from 'shared/assets/icons/Sidebar/friends.svg';
import AdminIcon from 'shared/assets/icons/Sidebar/admin.svg';
import { User } from 'entities/User';

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

interface MenuElementsProps {
  module: MenuTheme;
  authData: User;
}

export const getMenuElements = (props: MenuElementsProps) => {
  const { module, authData } = props;
  const isOpenIdAccount = !!authData?.lestaData?.account_id;
  const profileLink = isOpenIdAccount
    ? `${RoutePath.user_id}/${authData?.lestaData?.account_id}`
    : RoutePath.connectLesta;

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
      path: profileLink,
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
    logout: {
      name: 'Выйти из аккаунта',
      path: RoutePath.main,
      icon: <LogoutIcon />,
    },
    main: {
      name: 'Главная',
      path: RoutePath.main,
      icon: <HomeIcon />,
    },
    matches: {
      name: 'Матчи',
      path: RoutePath.matches,
      icon: <MatchIcon />,
    },
    tournaments: {
      name: 'Турниры',
      path: RoutePath.tournaments,
      icon: <TournamentIcon />,
    },
    teams: {
      name: 'Команды',
      path: RoutePath.teams,
      icon: <TeamsIcon />,
    },
    friends: {
      name: 'Друзья',
      path: RoutePath.friends,
      icon: <FriendIcon />,
    },
    admin: {
      name: 'Админка',
      path: RoutePath.main,
      icon: <AdminIcon />,
    },
  };

  const elements = {
    profileSidebar: [data.sessions, data.blacklist, data.edit],
    navbar: [data.user, data.sessions, data.blacklist, data.edit, data.logout],
    userSidebar: [
      data.main,
      data.matches,
      data.tournaments,
      data.teams,
      data.friends,
    ],
    adminSidebar: [
      data.main,
      data.matches,
      data.tournaments,
      data.teams,
      data.friends,
      data.admin,
    ],
  };

  return elements[module];
};
