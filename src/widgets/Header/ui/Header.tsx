import { FC } from 'react';
import { Logo } from 'shared/ui/Logo/Logo';
import { SearchForm } from 'features/Search/ui/SearchForm/SearchForm';
import { useMatch } from 'react-router-dom';
import { Navbar } from 'widgets/Navbar';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './Header.module.scss';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = () => {
  const isAuthPage = useMatch(RoutePath.auth);

  return (
    <header className={cls.Header} data-testid="header">
      <Logo theme="header" />
      <div className={cls.formWrapper}>
        <SearchForm />
        {!isAuthPage && <Navbar />}
      </div>
    </header>
  );
};
