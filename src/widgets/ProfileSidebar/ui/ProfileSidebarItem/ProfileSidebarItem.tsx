import { memo, ReactElement } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { NavLink } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './ProfileSidebarItem.module.scss';

interface IProfileSidebarItemProps {
  name: string;
  path: string;
  icon: ReactElement;
  isNavbar?: boolean;
}

export const ProfileSidebarItem = memo((props: IProfileSidebarItemProps) => {
  const {
    name, path, icon, isNavbar,
  } = props;

  return (
    <li className={classNames(cls.item)}>
      <NavLink
        className={({ isActive }) => classNames(cls.link, { [cls.linkActive]: isActive }, [])}
        to={path}
      >
        <span className={cls.linkName}>{name}</span>
        {icon}
        <div
          className={classNames(cls.line, { [cls.navbar]: isNavbar }, [])}
        />
      </NavLink>
    </li>
  );
});
