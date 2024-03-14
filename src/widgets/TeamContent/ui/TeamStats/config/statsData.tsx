import IconBattles from 'shared/assets/icons/userStats/battles.svg';
import IconTournaments from 'shared/assets/icons/Sidebar/tournaments.svg';
import IconDamage from 'shared/assets/icons/userStats/damage.svg';
import IconFriends from 'shared/assets/icons/Sidebar/teams.svg';

export const statsData = (
  battles: number,
  winrate: string | 0,
  damage: number,
  members: number,
) => [
  {
    icon: <IconBattles />,
    title: 'Боёв',
    result: battles,
  },
  {
    icon: <IconTournaments />,
    title: 'Побед',
    result: `${winrate}%`,
  },
  {
    icon: <IconDamage />,
    title: 'Урон',
    result: damage,
  },
  {
    icon: <IconFriends />,
    title: 'Участников',
    result: members,
  },
];
