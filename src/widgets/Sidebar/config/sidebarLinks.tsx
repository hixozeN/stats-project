import { JSX } from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import HomeIcon from 'shared/assets/icons/Sidebar/home.svg';
import MatchIcon from 'shared/assets/icons/Sidebar/matches.svg';
import TournamentIcon from 'shared/assets/icons/Sidebar/tournaments.svg';
import TeamsIcon from 'shared/assets/icons/Sidebar/teams.svg';
import FriendIcon from 'shared/assets/icons/Sidebar/friends.svg';
import AdminIcon from 'shared/assets/icons/Sidebar/admin.svg';

interface SidebarItemsProps {
  className?: string;
  isLoggedIn?: boolean;
}

interface SidebarItem {
  id?: number;
  name: string;
  icon: JSX.Element;
  link: string;
  authOnly?: boolean;
  guestOnly?: boolean;
}

export const dataList: SidebarItem[] = [
  {
    id: 0,
    name: 'Главная',
    icon: <HomeIcon />,
    link: RoutePath.main,
  },
  {
    id: 1,
    name: 'Статистика',
    icon: <MatchIcon />,
    link: '/user',
    authOnly: true,
  },
  {
    id: 2,
    name: 'Рейтинги',
    icon: <TournamentIcon />,
    link: '/rating',
  },
  {
    id: 3,
    name: 'Команды',
    icon: <TeamsIcon />,
    link: '/teams',
  },
  {
    id: 4,
    name: 'Профиль',
    icon: <FriendIcon />,
    link: '/profile',
    authOnly: true,
  },
  {
    id: 5,
    name: 'Вход',
    icon: <AdminIcon />,
    link: '/auth',
    guestOnly: true,
  },
];

export const getSidebarItems = ({ className, isLoggedIn }: SidebarItemsProps): SidebarItem[] => {
  const config: SidebarItem[] = [
    {
      id: 0,
      name: 'Главная',
      icon: <HomeIcon className={className} />,
      link: RoutePath.main,
    },
    {
      id: 1,
      name: 'Статистика',
      icon: <MatchIcon className={className} />,
      link: RoutePath.user_id,
      authOnly: true,
    },
    {
      id: 2,
      name: 'Рейтинги',
      icon: <TournamentIcon className={className} />,
      link: 'not-a-link',
    },
    {
      id: 3,
      name: 'Команды',
      icon: <TeamsIcon className={className} />,
      link: '/teams',
    },
    {
      id: 4,
      name: 'Профиль',
      icon: <FriendIcon className={className} />,
      link: '/profile',
      authOnly: true,
    },
    {
      id: 5,
      name: 'Вход',
      icon: <AdminIcon className={className} />,
      link: '/auth',
      guestOnly: true,
    },
  ];

  const items: SidebarItem[] = [];

  if (isLoggedIn) {
    config.forEach((item) => {
      if (item.guestOnly !== true) items.push(item);
    });
  }

  if (!isLoggedIn) {
    config.forEach((item) => {
      if (item.authOnly !== true) items.push(item);
    });
  }

  return items;
};
