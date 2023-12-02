import { FC } from 'react';
import { Logo } from 'shared/ui/Logo/Logo';
import { SearchForm } from 'features/Search/ui/SearchForm/SearchForm';
import { useLocation } from 'react-router-dom';
import { Navbar } from 'widgets/Navbar';
import cls from './Header.module.scss';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = () => {
  const { pathname } = useLocation();
  return (
    <header className={cls.Header}>
      <Logo theme="header" />
      <div className={cls.formWrapper}>
        <SearchForm />
        {pathname !== '/auth' && <Navbar />}
      </div>
    </header>
  );
};
