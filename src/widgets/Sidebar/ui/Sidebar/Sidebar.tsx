import { FC, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { useSizeScreen } from 'shared/hooks/useSizeScreen';
import { dataList } from '../../config/sidebarLinks';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { width } = useSizeScreen();
  const [isOpenMenu, setOpenMenu] = useState(false);

  const onToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleClickBurger = useCallback(() => {
    setOpenMenu(!isOpenMenu);
  }, [isOpenMenu]);

  return (
    <aside
      data-testid="sidebar"
      className={classNames(
        cls.Sidebar,
        { [cls.collapsed]: isCollapsed, [cls.active]: isOpenMenu },
        [className],
      )}
    >
      {width <= 1024 && (
        <Button
          theme="icon-circle"
          variant="burger"
          onClick={handleClickBurger}
          className={classNames(cls.burgerMenu)}
        />
      )}
      <nav>
        <ul
          className={classNames(cls.navList, {
            [cls.active]: isOpenMenu,
          })}
        >
          {dataList.map(({
            id, name, link, icon,
          }) => (
            <SidebarItem
              key={id}
              name={name}
              link={link}
              isCollapsed={isCollapsed}
              icon={icon}
            />
          ))}
        </ul>
      </nav>
      <Button
        data-testid="sidebar-toggle"
        theme="clear"
        onClick={onToggle}
        className={cls.collapsedBtn}
        square
        fontSize="font_l"
      >
        {isCollapsed ? '>' : '<'}
      </Button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher isShort={isCollapsed} />
      </div>
    </aside>
  );
};
