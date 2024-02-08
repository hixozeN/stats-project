import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { MenuItem } from '../MenuItem/MenuItem';
import {
  MenuData,
  MenuTheme,
  getMenuElements,
} from '../../config/profileMenuData';
import cls from './Menu.module.scss';

interface IProfileSidebarProps {
  theme: MenuTheme;
  cb?: () => void;
  isCollapsed?: boolean;
  isOpenMenu?: boolean;
}

export const Menu = memo(
  ({
    theme, cb, isCollapsed, isOpenMenu,
  }: IProfileSidebarProps) => {
    const { t } = useTranslation();

    const dataList = getMenuElements(theme);

    return (
      <ul
        className={classNames(cls.list, { [cls.collapsed]: isCollapsed }, [
          cls[theme],
        ])}
      >
        {dataList.map(({ path, name, icon }: MenuData, i: number) => (
          <MenuItem
            key={`${path}_${theme + i}`}
            name={t(`${name}`)}
            path={path}
            icon={icon}
            theme={theme}
            cb={cb}
            isCollapsed={isCollapsed}
            isOpenMenu={isOpenMenu}
          />
        ))}
      </ul>
    );
  },
);
