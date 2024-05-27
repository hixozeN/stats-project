import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import cls from './SidebarItem.module.scss';

interface ISidebarItemProps {
  className?: string;
  name: string;
  path: string;
  icon: ReactElement;
  isOpenMenu?: boolean;
  notificationCount?: number;
}

export const SidebarItem = memo((props: ISidebarItemProps) => {
  const {
    name, path, icon, className, isOpenMenu, notificationCount = 0,
  } = props;
  const { t } = useTranslation();

  return (
    <li
      className={
        classNames(cls.SidebarItem, {
          [cls.openMenu]: isOpenMenu,
        }, [className])
      }
      data-testid="sidebar-item"
    >
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? classNames(cls.link, {
          [cls.active]: isActive,
        }) : classNames(cls.link))}
      >
        {icon}
        <span
          className={classNames(
            cls.notification,
            { [cls.notificationActive]: !!notificationCount },
          )}
        >
          {notificationCount}
        </span>
        <span className={classNames(
          cls.linkText,
        )}
        >
          {t(`${name}`)}
        </span>
      </NavLink>
    </li>
  );
});
