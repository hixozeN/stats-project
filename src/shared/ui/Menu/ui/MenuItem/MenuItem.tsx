import { memo, ReactElement, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { logoutUser } from 'entities/User';
import { classNames } from 'shared/lib/classNames/classNames';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { MenuTheme } from '../../config/profileMenuData';
import cls from './MenuItem.module.scss';

interface MenuItemProps {
  name: string;
  path: string;
  icon: ReactElement;
  theme: MenuTheme;
  cb?: () => void;
  isCollapsed?: boolean;
  isOpenMenu?: boolean;
}

export const MenuItem = memo((props: MenuItemProps) => {
  const {
    name, path, icon, theme, cb, isCollapsed, isOpenMenu,
  } = props;

  const dispatch = useAppDispatch();
  const onLogout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const handleClick = () => {
    if (path === RoutePath.main) {
      onLogout();
    }
    if (cb) {
      cb();
    }
  };

  return (
    <li
      className={classNames(
        cls.item,
        { [cls.collapsed]: isCollapsed, [cls.openMenu]: isOpenMenu },
        [cls[theme]],
      )}
    >
      <NavLink
        className={({ isActive }) => classNames(cls.link, { [cls.linkActive]: isActive }, [cls[theme]])}
        to={path}
        onClick={handleClick}
      >
        <span className={cls.linkName}>{name}</span>
        {icon}
        {theme === 'profileSidebar' && (
          <div className={classNames(cls.line, {}, [cls[theme]])} />
        )}
      </NavLink>
    </li>
  );
});
