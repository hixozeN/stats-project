import React, { memo } from 'react';
import { AuthForm } from 'features/AuthUser';
import { ErrorBoundary } from 'app/providers/ErrorBoundary/index';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import { useTranslation } from 'react-i18next';
import cls from './AuthorizationPage.module.scss';

function AuthorizationPage() {
  const { t } = useTranslation('auth');

  return (
    <ErrorBoundary>
      <SeoUpdater
        title={t('authPageTitle')}
        OGTitle={t('authPageTitle')}
      />
      <div className={cls.auth}>
        <AuthForm />
      </div>
    </ErrorBoundary>
  );
}

export default memo(AuthorizationPage);
