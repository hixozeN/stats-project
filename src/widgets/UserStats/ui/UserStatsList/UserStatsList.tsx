import { memo, SVGProps, VFC } from 'react';
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
import { useSelector } from 'react-redux';
import { getUserDataLoadingStatus, getUserSessionLoadingStatus } from 'entities/Lesta/index';
import { StatsListItem } from '../../model/types/index';
import { UserStatsItem } from '../UserStatsItem/UserStatsItem';
import cls from './UserStatsList.module.scss';

interface UserStatsListProps {
  data: StatsListItem[];
  className?: string;
}

const Icons: Record<string, VFC<SVGProps<SVGSVGElement>>> = {
  battles: BattlesIcon,
  winRate: WinrateIcon,
  avgDamage: DamageIcon,
  wn8: RatingIcon,
  ratingValue: RatingIcon,
  wins: WinsIcon,
  losses: DefeatIcon,
  draws: DrawIcon,
  last_battle_time: ClockIcon,
  session_start_time: ClockIcon,
};

const labels: Record<string, string> = {
  battles: 'Бои',
  winRate: 'Винрейт',
  avgDamage: 'С/У',
  wn8: 'WN8',
  ratingValue: 'Рейтинг',
  wins: 'Победы',
  losses: 'Поражения',
  draws: 'Ничьи',
  last_battle_time: 'Посл. бой',
  session_start_time: 'Начало сессии',
};

export const UserStatsList = memo((props: UserStatsListProps) => {
  const {
    className, data,
  } = props;
  const { t } = useTranslation('userPage');

  const isLoadingUserData = useSelector(getUserDataLoadingStatus);
  const isLoadingSession = useSelector(getUserSessionLoadingStatus);

  if (isLoadingSession || isLoadingUserData) {
    return (
      <ul className={classNames(cls.statList, {}, [className])}>
        {[...new Array(8)].map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <UserStatsItem isLoading key={index} />
        ))}
      </ul>
    );
  }

  if (!data) {
    return (
      <div className={cls.emptyData}>
        <h2 className={cls.emptyDataHeading}>{t('Статистика временно недоступна... 😔')}</h2>
      </div>
    );
  }

  return (
    <ul className={classNames(cls.statList, {}, [className])}>
      {data.map((item: StatsListItem) => (
        <UserStatsItem
          key={item.label}
          Icon={Icons[`${item.label}`]}
          counter={item.value}
          itemName={labels[`${item.label}`]}
          delta={item.delta}
        />
      ))}
    </ul>
  );

  // return (
  //   <ul className={classNames(cls.statList, {}, [className])}>
  //     {data.map(({
  //       key, label, value, delta,
  //     }: StatsListItem) => (
  //       <UserStatsItem
  //         key={key}
  //         Icon={Icons[`${label}`]}
  //         counter={label === 'WN8' ? wn8 : value}
  //         itemName={label}
  //         delta={delta ?? 0}
  //       />
  //     ))}
  //   </ul>
  // );
});
