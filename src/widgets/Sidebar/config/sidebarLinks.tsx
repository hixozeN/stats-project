import HomeIcon from 'shared/assets/icons/Sidebar/home.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MatchIcon from 'shared/assets/icons/Sidebar/matches.svg';
import TournamentIcon from 'shared/assets/icons/Sidebar/tournaments.svg';
import TeamsIcon from 'shared/assets/icons/Sidebar/teams.svg';
import FriendIcon from 'shared/assets/icons/Sidebar/friends.svg';
import AdminIcon from 'shared/assets/icons/Sidebar/admin.svg';

export const dataList = [
  {
    id: 0,
    name: 'Главная',
    icon: <HomeIcon />,
    link: RoutePath.main,
  },
  {
    id: 1,
    name: 'Матчи',
    icon: <MatchIcon />,
    link: RoutePath.matches,
  },
  {
    id: 2,
    name: 'Турниры',
    icon: <TournamentIcon />,
    link: RoutePath.tournaments,
  },
  {
    id: 3,
    name: 'Команды',
    icon: <TeamsIcon />,
    link: RoutePath.teams,
  },
  {
    id: 4,
    name: 'Друзья',
    icon: <FriendIcon />,
    link: RoutePath.friends,
  },
  {
    id: 5,
    name: 'Админка',
    icon: <AdminIcon />,
    link: RoutePath.main,
  },
];
