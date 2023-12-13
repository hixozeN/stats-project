import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
/* eslint-disable no-unused-vars */
export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  BUTTON = 'button',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const {
    to, className, theme = AppLinkTheme.PRIMARY, children, ...otherProps
  } = props;

  return (
    <Link
      to={to}
      className={classNames(cls.AppLink, {}, [
        className,
        cls[theme],
        theme === AppLinkTheme.BUTTON ? '' : 'link-hovered',
      ])}
      {...otherProps}
    >
      {children}
    </Link>
  );
};
