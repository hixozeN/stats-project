import React, {
  memo, useCallback,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  fetchLestaUserDataById,
} from 'entities/Lesta/index';
import { getUserData } from 'entities/User/model/selectors/getUserData/getUserData';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { LOCAL_STORAGE_LESTA } from 'shared/consts/localstorage';
import { UserStatsList } from '../UserStatsList/UserStatsList';
import cls from './UserStats.module.scss';
import { StatsListItem } from '../../model/types';

interface IUserStatsProps {
  statItems: StatsListItem[];
  className?: string;
  tab?: number;
  id?: number;
  wn8?: number;
}

export const UserStats = memo(({
  className, tab, id, statItems, wn8,
}: IUserStatsProps) => {
  const { t } = useTranslation();
  const currentUser = useSelector(getUserData);
  const dispatch = useAppDispatch();

  const mainStatItems = statItems?.filter((item) => item.tab === 0);
  const sessionStatItems = statItems?.filter((item) => item.tab === 1);
  const ratingStatItems = statItems?.filter((item) => item.tab === 2);

  const handleUpdateSession = useCallback((shouldUpdateSession: boolean) => {
    const lestaAccessToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LESTA.TOKEN));
    dispatch(fetchLestaUserDataById(
      { id, shouldRefreshSession: shouldUpdateSession, lestaAccessToken },
    ));
  }, [dispatch, id]);

  return (
    <section
      className={classNames(cls.userStatsSection, {}, [className])}
    >
      {
        tab === 0 && <UserStatsList data={mainStatItems} wn8={wn8} />
      }
      {
        tab === 1 && <UserStatsList data={sessionStatItems} />
      }
      {
        tab === 2 && <UserStatsList data={ratingStatItems} wn8="---" />
      }
      {
        statItems
        && currentUser?.lestaData?.account_id === id
        && (
        <Button
          className={cls.btnUpdateSession}
          size="size_m"
          onClick={() => handleUpdateSession(true)}
        >
          {t('Новая сессия')}
        </Button>
        )
      }
    </section>
  );
});
