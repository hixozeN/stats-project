import { useState } from 'react';
import { AuthFormLazy as AuthForm } from '../AuthForm/AuthForm.lazy';
import { AuthSelect } from '../AuthSelect/AuthSelect';
import cls from './Auth.module.scss';

export const Auth = () => {
  const [isBlitzAuth, setIsBlitzAuth] = useState(false);

  return (
    <div className={cls.auth}>
      {!isBlitzAuth && <AuthSelect setIsBlitzAuth={setIsBlitzAuth} />}
      {isBlitzAuth && <AuthForm setIsBlitzAuth={setIsBlitzAuth} />}
    </div>
  );
};
