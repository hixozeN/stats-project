import React, {
  memo, useCallback, useMemo,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  createLestaUserSession, fetchLestaUserSessionById, getUserRatingDelta,
  getUserRatingStats,
  getUserSessionDelta, getUserSessionsMetaData,
  getUserSessionStats,
  getUserStats,
} from 'entities/Lesta';
import { getUserData } from 'entities/User';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useToasts } from 'shared/hooks/useToasts/useToasts';
import { getStatsList } from '../../lib/getStatsList';
import { UserStatsList } from '../UserStatsList/UserStatsList';
import { UserStatsSessionDates } from '../UserStatsSessionDates/UserStatsSessionDates';
import cls from './UserStats.module.scss';

interface IUserStatsProps {
  className?: string;
  tab?: number;
  id?: number;
}

export const UserStats = memo(({
  className, tab, id,
}: IUserStatsProps) => {
  const { t } = useTranslation();
  const currentUser = useSelector(getUserData);
  const dispatch = useAppDispatch();
  const { toastWithError } = useToasts();

  // NEW STORE
  const ratingData = useSelector(getUserRatingStats);
  const userStatistic = useSelector(getUserStats);
  const userSessionStats = useSelector(getUserSessionStats);
  const userSessionDelta = useSelector(getUserSessionDelta);
  const userRatingDelta = useSelector(getUserRatingDelta);
  const userSessionMeta = useSelector(getUserSessionsMetaData);

  const generalStatItems = useMemo(
    () => getStatsList(userStatistic, userSessionDelta),
    [userStatistic, userSessionDelta],
  );
  const ratingStatItems2 = useMemo(() => getStatsList(ratingData, userRatingDelta), [ratingData, userRatingDelta]);
  const sessionStatItems = useMemo(() => getStatsList(userSessionStats), [userSessionStats]);

  const handleUpdateSession = useCallback(() => {
    dispatch(createLestaUserSession())
      .unwrap()
      .then((res) => {
        const sessionId = [...res].pop().id;
        dispatch(fetchLestaUserSessionById({ sessionId }));
      })
      .catch(toastWithError);
  }, [dispatch, toastWithError]);

  return (
    <section
      className={classNames(cls.userStatsSection, {}, [className])}
    >
      {
        tab === 0 && <UserStatsList data={generalStatItems} />
      }
      {
        tab === 1 && <UserStatsList data={sessionStatItems} />
      }
      {
        tab === 2 && <UserStatsList data={ratingStatItems2} />
      }
      <UserStatsSessionDates userSessionMeta={userSessionMeta} />
      {
        currentUser?.lestaData?.account_id === id
        && (
        <Button
          className={cls.btnUpdateSession}
          size="size_m"
          onClick={handleUpdateSession}
        >
          {t('Новая сессия')}
        </Button>
        )
      }
    </section>
  );
});
