import { ReactElement, JSX } from 'react';
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
// import TeamsIcon from 'shared/assets/icons/Sidebar/teams.svg';
import FriendIcon from 'shared/assets/icons/Sidebar/friends.svg';
import AdminIcon from 'shared/assets/icons/Sidebar/admin.svg';
import AuthIcon from 'shared/assets/icons/button/add-friend.svg';
import WidgetIcon from 'shared/assets/icons/Sidebar/widget.svg';
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
  | 'adminSidebar'
  | 'guestSidebar';

interface MenuElement {
  name: string;
  path: string;
  icon: JSX.Element;
}

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

  const data: Record<string, MenuElement> = {
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
    stats: {
      name: 'Статистика',
      path: profileLink,
      icon: <MatchIcon />,
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
    ratings: {
      name: 'Рейтинги',
      path: `${RoutePath.rating}/?type=players`,
      icon: <TournamentIcon />,
    },
    widgets: {
      name: 'Виджеты',
      path: RoutePath.session_widget_settings,
      icon: <WidgetIcon />,
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
    auth: {
      name: 'Вход',
      path: RoutePath.auth,
      icon: <AuthIcon />,
    },
  };

  const elements: Record<MenuTheme, MenuElement[]> = {
    profileSidebar: [data.sessions, data.blacklist, data.edit],
    navbar: [data.user, data.sessions, data.blacklist, data.edit, data.logout],
    userSidebar: [
      data.main,
      data.stats,
      data.ratings,
      data.widgets,
      data.edit,
    ],
    adminSidebar: [
      data.main,
      data.matches,
      data.tournaments,
      data.widgets,
      data.friends,
      data.admin,
    ],
    guestSidebar: [
      data.main,
      data.ratings,
      data.widgets,
      data.auth,
    ],
  };

  return elements[module];
};
