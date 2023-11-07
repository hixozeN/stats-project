import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import HomeIcon from 'shared/assets/icons/Sidebar/home.svg';
import MatchIcon from 'shared/assets/icons/Sidebar/matches.svg';
import TournamentIcon from 'shared/assets/icons/Sidebar/tournaments.svg';
import TeamsIcon from 'shared/assets/icons/Sidebar/teams.svg';
import FriendIcon from 'shared/assets/icons/Sidebar/friends.svg';
import AdminIcon from 'shared/assets/icons/Sidebar/admin.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { SidebarItem } from 'widgets/Sidebar/ui/SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { t } = useTranslation();

  const onToggle = () => {
    setIsCollapsed((prev) => !prev);
  };
  const dataList = [
    {
      id: 0,
      name: 'Главная',
      icon: <HomeIcon />,
      link: RoutePath.main,
    },
    {
      id: 1,
      name: 'Матчи',
      icon: <MatchIcon />,
      link: RoutePath.matches,
    },
    {
      id: 2,
      name: 'Турниры',
      icon: <TournamentIcon />,
      link: RoutePath.tournaments,
    },
    {
      id: 3,
      name: 'Команды',
      icon: <TeamsIcon />,
      link: RoutePath.teams,
    },
    {
      id: 4,
      name: 'Друзья',
      icon: <FriendIcon />,
      link: RoutePath.friends,
    },
    {
      id: 5,
      name: 'Админка',
      icon: <AdminIcon />,
      link: RoutePath.main,
    },
  ];
  return (
    <aside
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: isCollapsed }, [className])}
    >
      <nav>
        <ul className={cls.navList}>
          {
            dataList.map(({
              id, name, link, icon,
            }) => (
              <SidebarItem
                key={id}
                name={name}
                link={link}
                isCollapsed={isCollapsed}
                icon={icon}
              />
            ))
          }
        </ul>
      </nav>
      <Button
        data-testid="sidebar-toggle"
        theme={ButtonTheme.BACKGROUND_INVERTED}
        onClick={onToggle}
        // className={collapsed ? cls.collapsedBtn : cls.notCollapsedBtn}
        className={cls.collapsedBtn}
        square
        size={ButtonSize.L}
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
