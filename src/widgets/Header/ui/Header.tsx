import { memo } from 'react';
import { Logo } from 'shared/ui/Logo/Logo';
import { SearchForm } from 'features/Search/ui/SearchForm/SearchForm';
import { useMatch } from 'react-router-dom';
import { Navbar } from 'widgets/Navbar';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ErrorBoundary } from 'app/providers/ErrorBoundary/index';
import cls from './Header.module.scss';

export const Header = memo(() => {
  const isAuthPage = useMatch(RoutePath.auth);

  if (isAuthPage) return null;

  return (
    <header className={cls.Header} data-testid="header">
      <Logo theme="header" />
      <div className={cls.formWrapper}>
        <ErrorBoundary>
          <SearchForm />
        </ErrorBoundary>
        <Navbar />
      </div>
    </header>
  );
});
