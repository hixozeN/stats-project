import React, { memo } from 'react';
import { AuthForm } from 'features/AuthUser';
import { ErrorBoundary } from 'app/providers/ErrorBoundary/index';
import cls from './AuthorizationPage.module.scss';

function AuthorizationPage() {
  return (
    <ErrorBoundary>
      <div className={cls.auth}>
        <AuthForm />
      </div>
    </ErrorBoundary>
  );
}

export default memo(AuthorizationPage);
