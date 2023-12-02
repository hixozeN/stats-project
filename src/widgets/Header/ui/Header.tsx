import { FC } from 'react';
import { Logo } from 'shared/ui/Logo/Logo';
import cls from './Header.module.scss';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = () => (
  <header className={cls.Header}>
    <Logo theme="header" />
  </header>
);
