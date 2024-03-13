import {
  memo, useEffect, useMemo, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { UserStats } from 'widgets/UserStats';
import { UserProfile } from 'widgets/UserProfile';
import { ErrorBoundary } from 'app/providers/ErrorBoundary/index';
import { classNames } from 'shared/lib/classNames/classNames';
import { Background } from 'shared/ui/Background/Background';
import { Tabs } from 'shared/ui/Tabs/Tabs';
import Loader from 'shared/ui/Loader/Loader';
import { Tanks } from 'widgets/Tanks';
import {
  fetchLestaUserDataById,
  getLestaLoadingStatus,
  getLestaUserFetchStatus,
  getLestaUserLastBattleTime,
  getLestaUserTanks,
  getLestaUserNickname,
  getLestaUserWN8,
  getLestaUserRatingData,
  getLestaUserStatisticsData,
  getUserLastSession,
  LestaUserSession,
  fetchLestaUserDataByIdV2,
} from 'entities/Lesta';
import { useSelector } from 'react-redux';
import { LOCAL_STORAGE_LESTA } from 'shared/consts/localstorage';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import { generateStatsList } from 'widgets/UserStats/lib/generateStatsList';

import { SessionControlSection } from '../ui/SessionControlSection/SessionControlSection';
import {
  fetchUserDataByLestaId,
} from 'entities/Lesta/model/services/fetchUserDataByLestaId/fetchUserDataByLestaId';
import cls from './UserPage.module.scss';

interface IUserPageProps {
  className?: string;
}

const UserPage = ({ className }: IUserPageProps) => {
  const { t } = useTranslation('userPage');
  const { id } = useParams<{ id: string }>();
  const ratingData = useSelector(getLestaUserRatingData);
  const statisticData = useSelector(getLestaUserStatisticsData);
  const userLastSession = useSelector(getUserLastSession);
  const lastBattleTime = useSelector(getLestaUserLastBattleTime);
  const isLoading = useSelector(getLestaLoadingStatus);
  const isNotFound = useSelector(getLestaUserFetchStatus);
  const userNickname = useSelector(getLestaUserNickname);
  const tanks = useSelector(getLestaUserTanks);
  const wn8 = useSelector(getLestaUserWN8);

  const [tab, setTab] = useState(0);
  const [session, setSession] = useState<LestaUserSession>(userLastSession);

  const statItems = useMemo(
    () => generateStatsList(statisticData, session, ratingData, lastBattleTime),
    [statisticData, session, ratingData, lastBattleTime],
  );
  const tabList = useMemo(() => [t('Статистика'), t('Сессия'), t('Рейтинг')], [t]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setSession(() => userLastSession);
  }, [userLastSession]);

  useEffect(() => {
    const lestaAccessToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LESTA.TOKEN));
    dispatch(fetchLestaUserDataById({
      id: Number(id),
      lestaAccessToken: lestaAccessToken ?? null,
    }));
    dispatch(
      fetchLestaUserDataByIdV2({
        id: Number(id),
        lestaAccessToken: lestaAccessToken ?? null,
      }),
    );
    dispatch(fetchUserDataByLestaId({
      id: Number(id),
      lestaAccessToken: lestaAccessToken ?? null,
    }));
  }, [id, dispatch]);

  if (isLoading) return <Loader />;

  if (isNotFound) {
    return (
      <ErrorBoundary>
        <SeoUpdater
          title={t('Пользователь не найден')}
        />
        <Background />
        <div className={classNames(cls.UserPage, {}, [className])}>
          <section
            className={classNames(cls.wrapper, {}, [cls.notFoundSection])}
          >
            <h2 className={cls.notFoundSectionHeading}>
              {t('Пользователь не найден')}
            </h2>
          </section>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <SeoUpdater
        title={`${t('Статистика игрока')} - ${userNickname}`}
      />
      <Background />
      <div className={classNames(cls.UserPage, {}, [className])}>
        <div className={cls.wrapper}>
          <UserProfile />
          <Tabs tab={tab} tabList={tabList} handleChangeTab={setTab} />
          <SessionControlSection id={Number(id)} setSession={setSession} />
          <UserStats tab={tab} id={Number(id)} statItems={statItems} wn8={wn8} />
          <Tanks dataList={tanks} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default memo(UserPage);
