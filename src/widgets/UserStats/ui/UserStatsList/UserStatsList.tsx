import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { UserStatsItem } from 'widgets/UserStats/ui/UserStatsItem/UserStatsItem';
import BattlesIcon from 'shared/assets/icons/userStats/battles.svg';
import WinrateIcon from 'shared/assets/icons/userStats/winrate.svg';
import DamageIcon from 'shared/assets/icons/userStats/damage.svg';
import RatingIcon from 'shared/assets/icons/userStats/rating.svg';
import WinsIcon from 'shared/assets/icons/userStats/wins.svg';
import DefeatIcon from 'shared/assets/icons/userStats/defeat.svg';
import DrawIcon from 'shared/assets/icons/userStats/handshake.svg';
import ClockIcon from 'shared/assets/icons/userStats/clock.svg';
import { StatsListItem } from 'widgets/UserStats/model/types/index';
import cls from './UserStatsList.module.scss';

interface UserStatsListProps {
  data: StatsListItem[];
  className?: string;
}

const Icons = {
  Бои: BattlesIcon,
  Винрейт: WinrateIcon,
  'С/У': DamageIcon,
  WN8: RatingIcon,
  Победы: WinsIcon,
  Поражения: DefeatIcon,
  Ничьи: DrawIcon,
  'Посл. бой': ClockIcon,
  'Начало сессии': ClockIcon,
};

export const UserStatsList = memo((props: UserStatsListProps) => {
  const { className, data } = props;

  if (!data) {
    return (
      <div className={cls.emptyData}>
        <h2 className={cls.emptyDataHeading}>Статистика временно недоступна... 😔</h2>
      </div>
    );
  }

  return (
    <ul className={cls.statList}>
      {data.map(({
        tab, key, label, value, delta,
      }: StatsListItem) => (
        <UserStatsItem
          key={key}
          Icon={Icons[`${label}`]}
          counter={value}
          itemName={label}
          delta={delta ?? 0}
        />
      ))}
    </ul>
  );
});
