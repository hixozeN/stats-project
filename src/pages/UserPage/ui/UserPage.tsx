import {
  memo, useCallback, useEffect, useMemo, useState,
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
  fetchLestaUserSessionById,
  fetchUserDataByLestaId,
} from 'entities/Lesta';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import { getLestaAccessToken, getTokenUpdateStatus } from 'entities/User/index';
import { useToasts } from 'shared/hooks/useToasts/useToasts';
import { SessionControlSection } from '../ui/SessionControlSection/SessionControlSection';
import cls from './UserPage.module.scss';

interface IUserPageProps {
  className?: string;
}

const UserPage = ({ className }: IUserPageProps) => {
  const { t } = useTranslation('userPage');
  const { id } = useParams<{ id: string }>();
  // NEW
  const isNotFound = useSelector(getUserNotFoundStatus);
  const isTokenUpdating = useSelector(getTokenUpdateStatus);
  const lestaAccessToken = useSelector(getLestaAccessToken);

  const { toastWithError } = useToasts();

  const [tab, setTab] = useState(0);
  const tabList = useMemo(
    () => [t('Статистика'), t('Сессия'), t('Рейтинг')],
    [t],
  );

  const dispatch = useAppDispatch();

  const fetchUserData = useCallback(() => {
    dispatch(fetchUserDataByLestaId({
      id: Number(id),
      lestaAccessToken,
    }))
      .unwrap()
      .then((res) => {
        const sessionId = res.userData.personal.sessions.length > 0
          ? [...res.userData.personal.sessions].pop().id
          : null;

        if (sessionId) {
          dispatch(fetchLestaUserSessionById({ sessionId }));
        }
      })
      .catch(toastWithError);
  }, [dispatch, id, lestaAccessToken, toastWithError]);

  useEffect(() => {
    if (!isTokenUpdating) {
      fetchUserData();
    }
  }, [fetchUserData, isTokenUpdating]);

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
        title={t('PAGE_TITLE')}
        OGTitle={`${t('Статистика игрока')}`}
      />
      <Background />
      <div className={classNames(cls.UserPage, {}, [className])}>
        <div className={cls.wrapper}>
          <UserProfile />
          <Tabs tab={tab} tabList={tabList} handleChangeTab={setTab} />
          <SessionControlSection />
          <UserStats tab={tab} id={Number(id)} />
          {tab !== 2 && <Tanks tab={tab} />}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default memo(UserPage);
