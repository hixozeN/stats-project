import { FC, lazy } from 'react';
import { IAuthFormProps } from './AuthForm';

export const AuthFormLazy = lazy<FC<IAuthFormProps>>(() => import('./AuthForm'));
