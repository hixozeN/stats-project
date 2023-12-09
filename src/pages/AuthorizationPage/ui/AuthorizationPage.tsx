import React, { memo } from 'react';
import { AuthForm } from 'features/AuthUser';
import cls from './AuthorizationPage.module.scss';

function AuthorizationPage() {
  return (
    <div className={cls.auth}>
      <AuthForm />
    </div>
  );
}

export default memo(AuthorizationPage);
