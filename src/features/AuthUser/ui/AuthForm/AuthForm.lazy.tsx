import { FC, lazy } from 'react';
import { IAuthFormProps } from './AuthForm';

export const AuthFormLazy = lazy<FC<IAuthFormProps>>(() => new Promise((resolve) => {
  // @ts-ignore
  setTimeout(() => resolve(import('./AuthForm')), 500);
}));
