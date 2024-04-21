import React, { memo } from 'react';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { ProfileSidebar } from 'widgets/ProfileSidebar';
import { Navigate, Outlet, useMatch } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Background } from 'shared/ui/Background/Background';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import { useTranslation } from 'react-i18next';
import cls from './UserProfilePage.module.scss';

const UserProfilePage = () => {
  const isMainProfileLink = useMatch(RoutePath.profile);
  const { t } = useTranslation('profile');

  if (isMainProfileLink) {
    return <Navigate to={RoutePath.profile_edit} />;
  }

  return (
    <ErrorBoundary>
      <SeoUpdater
        title={t('userProfileTitle')}
      />
      <Background />
      <div className={cls.profile}>
        <ProfileSidebar />
        <div className={cls.wrapper}>
          <Outlet />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default memo(UserProfilePage);
