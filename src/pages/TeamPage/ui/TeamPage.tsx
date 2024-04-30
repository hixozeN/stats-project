import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from 'shared/ui/Loader/Loader';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { Background } from 'shared/ui/Background/Background';
import { TeamContent } from 'widgets/TeamContent';
import { TeamMembersTable } from 'widgets/TeamMembersTable';
import {
  fetchLestaClanData,
  getClanLoadingStatus,
  getClanNotFoundStatus,
} from 'entities/Lesta';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import cls from './TeamPage.module.scss';

interface TeamPageProps {
  className?: string;
}

export const TeamPage = memo((props: TeamPageProps) => {
  const { className } = props;
  const { t } = useTranslation('teamPage');
  const { clanId } = useParams<{ clanId: string }>();
  const isLoading = useSelector(getClanLoadingStatus);
  const isNotFound = useSelector(getClanNotFoundStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLestaClanData({ id: clanId }));
  }, [clanId, dispatch]);

  if (isLoading) return <Loader />;

  if (isNotFound) {
    return (
      <ErrorBoundary>
        <SeoUpdater title={t('PAGE_TITLE')} />
        <Background />
        <main className={classNames(cls.TeamPage, {}, [className])}>
          <div className={cls.wrapper}>
            <h1 className={cls.title}>{t('Клан не найден')}</h1>
          </div>
        </main>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <SeoUpdater title={t('PAGE_TITLE')} />
      <Background />
      <main className={classNames(cls.TeamPage, {}, [className])}>
        <div className={cls.wrapper}>
          <TeamContent />
          <TeamMembersTable />
        </div>
      </main>
    </ErrorBoundary>
  );
});
