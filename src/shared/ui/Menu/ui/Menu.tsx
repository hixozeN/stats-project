import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem } from 'shared/ui/Menu/ui/MenuItem';
import cls from './Menu.module.scss';
import {
  MenuData,
  MenuTheme,
  getMenuElements,
} from '../config/profileMenuData';

interface IProfileSidebarProps {
  theme: MenuTheme;
  cb?: () => void;
}

export const Menu = memo(({ theme, cb }: IProfileSidebarProps) => {
  const { t } = useTranslation();

  const dataList = getMenuElements(theme);

  return (
    <ul className={classNames(cls.list, {}, [cls[theme]])}>
      {dataList.map(({ path, name, icon }: MenuData, i: number) => (
        <MenuItem
          key={`${path}_${theme + i}`}
          name={t(`${name}`)}
          path={path}
          icon={icon}
          theme={theme}
          cb={cb}
        />
      ))}
    </ul>
  );
});
