import {
  memo, useCallback,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import BattlesIcon from 'shared/assets/icons/userStats/battles.svg';
import WinrateIcon from 'shared/assets/icons/userStats/winrate.svg';
import DamageIcon from 'shared/assets/icons/userStats/damage.svg';
import RatingIcon from 'shared/assets/icons/userStats/rating.svg';
import DefeatIcon from 'shared/assets/icons/userStats/defeat.svg';
import DrawIcon from 'shared/assets/icons/userStats/handshake.svg';
import WinsIcon from 'shared/assets/icons/userStats/wins.svg';
import ClockIcon from 'shared/assets/icons/userStats/clock.svg';
import { LestaUserData } from 'entities/User/index';
import { useSelector } from 'react-redux';
import {
  getLestaUserLastBattleTime,
  getLestaUserRatingData,
  getLestaUserStatisticsData, getUserLastSession,
} from 'entities/Lesta/index';
import { generateStatsList } from 'widgets/UserStats/lib/generateStatsList';
import { UserStatsList } from 'widgets/UserStats/ui/UserStatsList/UserStatsList';
import { UserStatsItem } from '../UserStatsItem/UserStatsItem';
import cls from './UserStats.module.scss';

interface IUserStatsProps {
  className?: string;
  tab?: number;
  user?: LestaUserData;
}

export const UserStats = memo(({ className, tab, user }: IUserStatsProps) => {
  const { t } = useTranslation();
  const ratingData = useSelector(getLestaUserRatingData);
  const statisticData = useSelector(getLestaUserStatisticsData);
  const userLastSession = useSelector(getUserLastSession);
  const lastBattleTime = useSelector(getLestaUserLastBattleTime);

  const statItems = generateStatsList(statisticData, userLastSession, ratingData, lastBattleTime);
  const mainStatItems = statItems?.filter((item) => item.tab === 0);
  const sessionStatItems = statItems?.filter((item) => item.tab === 1);
  const ratingStatItems = statItems?.filter((item) => item.tab === 2);

  return (
    <section className={classNames(cls.userStatsSection, {}, [className])}>
      {
        tab === 0 && <UserStatsList data={mainStatItems} />
      }
      {
        tab === 1 && <UserStatsList data={sessionStatItems} />
      }
      {
        tab === 2 && <UserStatsList data={ratingStatItems} />
      }
      {
        statItems
        && <Button className={cls.btnUpdateSession} size="size_m">{t('Новая сессия')}</Button>
      }
    </section>
  );
});
