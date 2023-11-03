import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './AuthForm.module.scss';

interface IAuthFormProps {
  className?: string;
}

export const AuthForm = memo(({ className }: IAuthFormProps) => (
  <form className={classNames(cls.AuthForm, {}, [className])}>
    <h2>logo</h2>
    <div>tabs</div>
    <input />
    <input />
    <span>Forgot pw text</span>
    <button>Sign in</button>
  </form>
));
