import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import HomeIcon from 'shared/assets/icons/Sidebar/home.svg';
import HomeIconDark from 'shared/assets/icons/Sidebar/home-dark.svg';
import MatchIcon from 'shared/assets/icons/Sidebar/matches.svg';
import MatchIconDark from 'shared/assets/icons/Sidebar/matches-dark.svg';
import TournamentIcon from 'shared/assets/icons/Sidebar/tournaments.svg';
import TournamentIconDark from 'shared/assets/icons/Sidebar/tournaments-dark.svg';
import TeamsIcon from 'shared/assets/icons/Sidebar/teams.svg';
import TeamsIconDark from 'shared/assets/icons/Sidebar/teams-dark.svg';
import FriendIcon from 'shared/assets/icons/Sidebar/friends.svg';
import FriendIconDark from 'shared/assets/icons/Sidebar/friends-dark.svg';
import AdminIcon from 'shared/assets/icons/Sidebar/admin.svg';
import AdminIconDark from 'shared/assets/icons/Sidebar/admin-dark.svg';
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
      iconLigth: <HomeIcon />,
      iconDark: <HomeIconDark />,
      link: RoutePath.main,
    },
    {
      id: 1,
      name: 'Матчи',
      iconLigth: <MatchIcon />,
      iconDark: <MatchIconDark />,
      link: RoutePath.matches,
    },
    {
      id: 2,
      name: 'Турниры',
      iconLigth: <TournamentIcon />,
      iconDark: <TournamentIconDark />,
      link: RoutePath.tournaments,
    },
    {
      id: 3,
      name: 'Команды',
      iconLigth: <TeamsIcon />,
      iconDark: <TeamsIconDark />,
      link: RoutePath.teams,
    },
    {
      id: 4,
      name: 'Друзья',
      iconLigth: <FriendIcon />,
      iconDark: <FriendIconDark />,
      link: RoutePath.friends,
    },
    {
      id: 5,
      name: 'Админка',
      iconLigth: <AdminIcon />,
      iconDark: <AdminIconDark />,
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
              id, name, link, iconLigth, iconDark,
            }) => (
              <SidebarItem
                key={id}
                name={name}
                link={link}
                isCollapsed={isCollapsed}
                icon={iconLigth}
                iconDark={iconDark}
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
