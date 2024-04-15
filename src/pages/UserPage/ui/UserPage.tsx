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
  getUserNotFoundStatus,
  getUserNickname,
  getUserLastSessionId,
} from 'entities/Lesta';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import {
  fetchUserDataByLestaId,
} from 'entities/Lesta/model/services/fetchUserDataByLestaId/fetchUserDataByLestaId';
import {
  fetchLestaUserSessionById,
} from 'entities/Lesta/model/services/fetchLestaUserSession/fetchLestaUserSession';
import { getLestaAccessToken, getTokenUpdateStatus } from 'entities/User/index';
import { SessionControlSection } from '../ui/SessionControlSection/SessionControlSection';
import cls from './UserPage.module.scss';

interface IUserPageProps {
  className?: string;
}

const UserPage = ({ className }: IUserPageProps) => {
  const { t } = useTranslation('userPage');
  const { id } = useParams<{ id: string }>();
  // NEW
  const userNickname = useSelector(getUserNickname);
  const isNotFound = useSelector(getUserNotFoundStatus);
  const userLastSession = useSelector(getUserLastSessionId);
  const isTokenUpdating = useSelector(getTokenUpdateStatus);
  const lestaAccessToken = useSelector(getLestaAccessToken);

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
    if (!isTokenUpdating) {
      dispatch(fetchUserDataByLestaId({
        id: Number(id),
        lestaAccessToken,
      }));
    }
  }, [id, dispatch, isTokenUpdating, lestaAccessToken]);

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
        OGTitle={`${t('Статистика игрока')} - ${userNickname}`}
      />
      <Background />
      <div className={classNames(cls.UserPage, {}, [className])}>
        <div className={cls.wrapper}>
          <UserProfile />
          <Tabs tab={tab} tabList={tabList} handleChangeTab={setTab} />
          <SessionControlSection id={Number(id)} />
          <UserStats tab={tab} id={Number(id)} />
          {tab !== 2 && <Tanks tab={tab} />}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default memo(UserPage);
