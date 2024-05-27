import { useState } from 'react';
import { AuthForm } from '../AuthForm/AuthForm';
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
