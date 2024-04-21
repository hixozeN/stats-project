import HomeIcon from 'shared/assets/icons/Sidebar/home.svg';
import MatchIcon from 'shared/assets/icons/Sidebar/matches.svg';
import TournamentIcon from 'shared/assets/icons/Sidebar/tournaments.svg';
import TeamsIcon from 'shared/assets/icons/Sidebar/teams.svg';
import FriendIcon from 'shared/assets/icons/Sidebar/friends.svg';
// import AdminIcon from 'shared/assets/icons/Sidebar/admin.svg';

export const dataList = [
  {
    id: 0,
    name: 'Главная',
    icon: <HomeIcon />,
    link: '/',
  },
  {
    id: 1,
    name: 'Статистика',
    icon: <MatchIcon />,
    link: '/user',
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
  },
  // {
  //   id: 5,
  //   name: 'Админка',
  //   icon: <AdminIcon />,
  //   link: '/',
  // },
];
