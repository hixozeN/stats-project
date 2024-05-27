import IconBattles from 'shared/assets/icons/userStats/battles.svg';
import IconTournaments from 'shared/assets/icons/Sidebar/tournaments.svg';
import IconDamage from 'shared/assets/icons/userStats/damage.svg';
import IconFriends from 'shared/assets/icons/Sidebar/teams.svg';
import IconWN8 from 'shared/assets/icons/userStats/winrate.svg';
import IconRating from 'shared/assets/icons/userStats/rating.svg';

export const statsData = (
  battles: number,
  winrate: number,
  damage: number,
  rating: number,
  wn8: number,
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
    icon: <IconRating />,
    title: 'Рейтинг',
    result: rating,
  },
  {
    icon: <IconWN8 />,
    title: 'WN8',
    result: wn8,
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
