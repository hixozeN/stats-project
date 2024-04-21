import {
  memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Tabs } from 'shared/ui/Tabs/Tabs';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import {
  getHallOfFame,
  getLeaderboardByDamage, getLeaderboardByWinRate,
  getLeaderboardByWN8, ILeaderboardItem, isLeaderBoardLoading, Leaderboard,
} from 'features/playersLeaderboard';
import { useSelector } from 'react-redux';
import cls from './TournamentStars.module.scss';

interface TournamentStarsProps {
  className?: string;
}

export const TournamentStars = memo(({ className }: TournamentStarsProps) => {
  const { t } = useTranslation('main');
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState(0);
  const tabList = useMemo(() => [t('WN8'), t('DAMAGE'), t('WINRATE')], [t]);
  const leaderboardByWN8 = useSelector(getLeaderboardByWN8);
  const leaderboardByDamage = useSelector(getLeaderboardByDamage);
  const leaderboardByWinrate = useSelector(getLeaderboardByWinRate);
  const isLoading = useSelector(isLeaderBoardLoading);

  useEffect(() => {
    dispatch(getHallOfFame());
  }, [dispatch]);

  const leaderboard: Record<number, ILeaderboardItem[]> = useMemo(() => ({
    0: leaderboardByWN8,
    1: leaderboardByDamage,
    2: leaderboardByWinrate,
  }), [leaderboardByWN8, leaderboardByDamage, leaderboardByWinrate]);

  const renderHallOfFame = useCallback((tabNumber: number) => (
    <Leaderboard data={leaderboard[tabNumber]} isLoading={isLoading} />
  ), [leaderboard, isLoading]);

  return (
    <section className={classNames(cls.tournamentStars, {}, [className])}>
      <h2 className={cls.title}>{t('LEADERBOARD_HEADING')}</h2>
      <p className={cls.text}>
        {t('LEADERBOARD_DESCRIPTION')}
      </p>
      <Tabs tab={tab} tabList={tabList} handleChangeTab={setTab} />
      {renderHallOfFame(tab)}
    </section>
  );
});
