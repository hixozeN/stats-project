import { FC } from 'react';
import { Logo } from 'shared/ui/Logo/Logo';
import { SearchForm } from 'features/Search/ui/SearchForm/SearchForm';
import cls from './Header.module.scss';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = () => (
  <header className={cls.Header}>
    <Logo theme="header" />
    <div className={cls.formWrapper}>
      <SearchForm />
    </div>
  </header>
);
