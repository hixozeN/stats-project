import { ReactElement } from 'react';
import StatsIcon from 'shared/assets/icons/stats.svg';
import HistoryIcon from 'shared/assets/icons/history.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import SettingsIcon from 'shared/assets/icons/settings.svg';
import BlacklistIcon from 'shared/assets/icons/blacklist.svg';
import LogoutIcon from 'shared/assets/icons/logout2.svg';

export interface MenuData {
  id: number;
  name: string;
  path: string;
  icon: ReactElement;
}

export const dataList: any = [
  {
    id: 0,
    name: 'Статистика',
    path: 'profile_stats',
    icon: <StatsIcon />,
  },
  // {
  //   id: 1,
  //   name: 'История матчей',
  //   path: 'profile_history',
  //   icon: <HistoryIcon />,
  // },
  // {
  //   id: 2,
  //   name: 'Личные данные',
  //   path: 'profile_edit',
  //   icon: <ProfileIcon />,
  // },
  // {
  //   id: 3,
  //   name: 'Параметры',
  //   path: 'profile_settings',
  //   icon: <SettingsIcon />,
  // },
  // {
  //   id: 4,
  //   name: 'Черный список',
  //   path: 'profile_blacklist',
  //   icon: <BlacklistIcon />,
  // },
  // {
  //   id: 5,
  //   name: 'Выйти из аккаунта',
  //   path: 'main',
  //   icon: <LogoutIcon />,
  // },
];
