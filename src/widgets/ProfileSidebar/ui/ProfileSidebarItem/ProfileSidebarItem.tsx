import { memo, ReactElement } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { NavLink } from 'react-router-dom';
import cls from './ProfileSidebarItem.module.scss';

interface IProfileSidebarItemProps {
  name: string;
  path: string;
  icon: ReactElement;
}

export const ProfileSidebarItem = memo((props: IProfileSidebarItemProps) => {
  const { name, path, icon } = props;

  return (
    <li className={classNames(cls.item)}>
      <NavLink
        className={({ isActive }) => classNames(cls.link, { [cls.linkActive]: isActive })}
        to={path}
      >
        <span className={cls.linkName}>{name}</span>
        {icon}
        <div className={classNames(cls.line, {}, [])} />
      </NavLink>
    </li>
  );
});
