import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import cls from './SidebarItem.module.scss';

interface ISidebarItemProps {
  className?: string;
  name: string;
  link: string;
  icon: ReactElement;
  isCollapsed: boolean;
}

export function SidebarItem(props: ISidebarItemProps) {
  const {
    name, link, icon, isCollapsed,
  } = props;
  const { t } = useTranslation();

  return (
    <li
      className={
        classNames(cls.SidebarItem, {
          [cls.collapsed]: isCollapsed,
        })
      }
    >
      <NavLink
        // theme={AppLinkTheme.SECONDARY}
        to={link}
        className={({ isActive }) => (isActive ? classNames(cls.link, {
          [cls.collapsed]: isCollapsed,
          [cls.active]: isActive,
        }) : classNames(cls.link, { [cls.collapsed]: isCollapsed }))}
      >
        {icon}
        <span
          className={classNames(
            cls.notification,
            { [cls.collapsed]: isCollapsed, [cls.notificationActive]: cls.active },
          )}
        >
          3
        </span>
        <span className={classNames(
          cls.linkText,
          { [cls.collapsed]: isCollapsed },
        )}
        >
          {t(`${name}`)}
        </span>
      </NavLink>
    </li>
  );
}
