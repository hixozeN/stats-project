import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import BattlesIcon from 'shared/assets/icons/userStats/battles.svg';
import WinrateIcon from 'shared/assets/icons/userStats/winrate.svg';
import DamageIcon from 'shared/assets/icons/userStats/damage.svg';
import RatingIcon from 'shared/assets/icons/userStats/rating.svg';
import WinsIcon from 'shared/assets/icons/userStats/wins.svg';
import DefeatIcon from 'shared/assets/icons/userStats/defeat.svg';
import DrawIcon from 'shared/assets/icons/userStats/handshake.svg';
import ClockIcon from 'shared/assets/icons/userStats/clock.svg';
import { useTranslation } from 'react-i18next';
import { StatsListItem } from '../../model/types/index';
import { UserStatsItem } from '../UserStatsItem/UserStatsItem';
import cls from './UserStatsList.module.scss';

interface UserStatsListProps {
  data: StatsListItem[];
  className?: string;
  wn8?: number | string;
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
  'Старт сессии': ClockIcon,
};

export const UserStatsList = memo((props: UserStatsListProps) => {
  const { className, data, wn8 = 0 } = props;
  const { t } = useTranslation('userPage');

  if (!data) {
    return (
      <div className={cls.emptyData}>
        <h2 className={cls.emptyDataHeading}>{t('Статистика временно недоступна... 😔')}</h2>
      </div>
    );
  }

  return (
    <ul className={classNames(cls.statList, {}, [className])}>
      {data.map(({
        key, label, value, delta,
      }: StatsListItem) => (
        <UserStatsItem
          key={key}
          Icon={Icons[`${label}`]}
          counter={label === 'WN8' ? wn8 : value}
          itemName={label}
          delta={delta ?? 0}
        />
      ))}
    </ul>
  );
});
