import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User';
import { getMenuElements } from 'shared/ui/Menu/config/profileMenuData';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({
  className,
}: SidebarProps) => {
  const { t } = useTranslation();
  const [isOpenMenu, setOpenMenu] = useState(false);
  const authData = useSelector(getUserData);

  const sidebarItems = getMenuElements({
    module: authData ? 'userSidebar' : 'guestSidebar',
    authData,
  });

  const handleClickBurger = useCallback(() => {
    setOpenMenu(!isOpenMenu);
  }, [isOpenMenu]);

  return (
    <aside
      data-testid="sidebar"
      className={classNames(
        cls.Sidebar,
        { [cls.active]: isOpenMenu },
        [className],
      )}
    >
      <Button
        aria-label={t('SIDEBAR_BURGER_BTN_LABEL')}
        theme="icon-circle"
        variant="burger"
        onClick={handleClickBurger}
        className={classNames(cls.burgerMenu)}
      />
      <nav>
        <ul
          className={classNames(cls.navList, {
            [cls.active]: isOpenMenu,
          })}
        >
          {sidebarItems.map(({
            name, path, icon,
          }) => (
            <SidebarItem
              key={path}
              name={name}
              path={path}
              icon={icon}
              isOpenMenu={isOpenMenu}
            />
          ))}
        </ul>
      </nav>
      <div className={cls.switchers}>
        {IS_DEV && <ThemeSwitcher />}
        <LangSwitcher isShort />
      </div>
    </aside>
  );
});
