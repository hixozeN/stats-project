import { memo } from 'react';
import { Logo } from 'shared/ui/Logo/Logo';
import { Navbar } from 'widgets/Navbar';
import { ErrorBoundary } from 'app/providers/ErrorBoundary/index';
import { classNames } from 'shared/lib/classNames/classNames';
import { Search } from 'features/Search';
import cls from './Header.module.scss';

interface HeaderProps {
  className?: string;
}

export const Header = memo(({ className }: HeaderProps) => (
  <header
    className={classNames(cls.Header, {}, [className])}
    data-testid="header"
  >
    <Logo theme="header" />
    <div className={cls.formWrapper}>
      <ErrorBoundary>
        <Search />
      </ErrorBoundary>
      <Navbar />
    </div>
  </header>
));
