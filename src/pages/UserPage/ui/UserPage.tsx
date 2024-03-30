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
import { Tanks } from 'widgets/Tanks';
import {
  getLestaUserTanks,
  getUserNotFoundStatus,
  getUserNickname,
  getUserLastSessionId,
} from 'entities/Lesta';
import { useSelector } from 'react-redux';
import {
  LOCAL_STORAGE_LESTA,
} from 'shared/consts/localstorage';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import { fetchUserDataByLestaId } from 'entities/Lesta/model/services/fetchUserDataByLestaId/fetchUserDataByLestaId';
import { fetchLestaUserSessionById } from 'entities/Lesta/model/services/fetchLestaUserSession/fetchLestaUserSession';
import { SessionControlSection } from '../ui/SessionControlSection/SessionControlSection';
import cls from './UserPage.module.scss';

interface IUserPageProps {
  className?: string;
}

const UserPage = ({ className }: IUserPageProps) => {
  const { t } = useTranslation('userPage');
  const { id } = useParams<{ id: string }>();
  const tanks = useSelector(getLestaUserTanks);
  // NEW
  const userNickname = useSelector(getUserNickname);
  const isNotFound = useSelector(getUserNotFoundStatus);
  const userLastSession = useSelector(getUserLastSessionId);

  const [tab, setTab] = useState(0);
  const tabList = useMemo(
    () => [t('Статистика'), t('Сессия'), t('Рейтинг')],
    [t],
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userLastSession) {
      dispatch(fetchLestaUserSessionById({ sessionId: userLastSession.id }));
    }
  }, [dispatch, userLastSession]);

  useEffect(() => {
    const lestaAccessToken = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_LESTA.TOKEN),
    );
    dispatch(
      fetchUserDataByLestaId({
        id: Number(id),
        lestaAccessToken: lestaAccessToken ?? null,
      }),
    );
  }, [id, dispatch]);

  if (isNotFound) {
    return (
      <ErrorBoundary>
        <SeoUpdater title={t('Пользователь не найден')} />
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
      <SeoUpdater title={`${t('Статистика игрока')} - ${userNickname}`} />
      <Background />
      <div className={classNames(cls.UserPage, {}, [className])}>
        <div className={cls.wrapper}>
          <UserProfile />
          <Tabs tab={tab} tabList={tabList} handleChangeTab={setTab} />
          <SessionControlSection id={Number(id)} />
          <UserStats tab={tab} id={Number(id)} />
          <Tanks dataList={tanks} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default memo(UserPage);
