import React, { memo, useState } from 'react';
import { AuthForm } from 'features/AuthUser';
import { ErrorBoundary } from 'app/providers/ErrorBoundary/index';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import { useTranslation } from 'react-i18next';
import cls from './AuthorizationPage.module.scss';
import { AuthSelect } from 'features/AuthUser/ui/AuthSelect/AuthSelect';

function AuthorizationPage() {
  const { t } = useTranslation('auth');
  const [isBlitzAuth, setIsBlitzAuth] = useState(false);

  return (
    <ErrorBoundary>
      <SeoUpdater
        title={t('authPageTitle')}
        OGTitle={t('authPageTitle')}
      />
      <div className={cls.auth}>
        {!isBlitzAuth && <AuthSelect setIsBlitzAuth={setIsBlitzAuth}/>}
        {isBlitzAuth && <AuthForm />}
      </div>
    </ErrorBoundary>
  );
}

export default memo(AuthorizationPage);
