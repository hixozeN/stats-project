import React, {
  memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  getLeaderBoard,
  getLeaderboardGeneral,
  isGeneralLeaderboardLoading,
} from 'features/playersLeaderboard/index';
import {
  ReducerList,
  useDynamicReducerLoader,
} from 'shared/hooks/useDynamicReducerLoader/useDynamicReducerLoader';
import { leaderboardReducer } from 'features/playersLeaderboard/model/slice/leaderboardSlice';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { Leaderboard } from '../Leaderboard/Leaderboard';
import cls from './LeaderboardWithSorting.module.scss';

interface LeaderboardWithSortingProps {
  className?: string;
}

type SortValue = 'battles' | 'damage' | 'winrate' | 'wn8';

const initialReducers: ReducerList = { leaderboard: leaderboardReducer };

export const LeaderboardWithSorting = memo((props: LeaderboardWithSortingProps) => {
  const { className } = props;
  const { t } = useTranslation('rating');
  useDynamicReducerLoader({ reducers: initialReducers, removeAfterUnmount: true });
  const dispatch = useAppDispatch();
  const ratingList = useSelector(getLeaderboardGeneral);
  const isLoading = useSelector(isGeneralLeaderboardLoading);

  const [battles, setBattles] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<SortValue>('wn8');

  useEffect(() => {
    dispatch(getLeaderBoard({
      battles,
      sortBy,
      limit: 100,
    }));
  }, [dispatch, battles, sortBy]);

  const titleConfig: Record<string, string> = useMemo(() => ({
    wn8: t('WN8'),
    damage: t('AVERAGE_DAMAGE'),
    winrate: t('WINRATE'),
  }), [t]);

  const battlesCountList = useMemo(() => ([1000, 5000, 10000, 15000]), []);
  const sortingList = useMemo(() => (['wn8', 'damage', 'winrate']), []);

  const renderButtonsWithBattles = useCallback(() => battlesCountList.map((battlesCount) => (
    <Button
      theme={battles === battlesCount ? 'default' : 'send-results'}
      onClick={() => setBattles(battlesCount)}
    >
      {t(`${battlesCount}_BATTLES`)}
    </Button>
  )), [battlesCountList, battles, t]);

  const renderButtonsWithSorting = useCallback(() => sortingList.map((sortItem: SortValue) => (
    <Button
      theme={sortBy === sortItem ? 'default' : 'send-results'}
      onClick={() => setSortBy(sortItem)}
    >
      {titleConfig[sortItem]}
    </Button>
  )), [sortingList, sortBy, titleConfig]);

  return (
    <div className={classNames(cls.LeaderboardWithSorting, {}, [className])}>
      <section className={cls.heading}>
        <h1 className={cls.title}>{t('LEADERBOARD_TITLE')}</h1>
        <span className={cls.description}>{titleConfig[sortBy]}</span>
      </section>
      <section className={cls.filterSection}>
        <div className={cls.battlesChoose}>
          {renderButtonsWithBattles()}
        </div>
        <div className={cls.sortByChoose}>
          {renderButtonsWithSorting()}
        </div>
      </section>
      <Leaderboard data={ratingList} isLoading={isLoading} />
    </div>
  );
});
