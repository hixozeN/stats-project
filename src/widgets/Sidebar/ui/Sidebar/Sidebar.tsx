import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import HomeIcon from 'shared/assets/icons/home.svg';
import InfoIcon from 'shared/assets/icons/info.svg';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(true);
  const { t } = useTranslation();

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
    >
      <nav>
        <ul className={cls.navList}>
          <li>
            <AppLink
              theme={AppLinkTheme.SECONDARY}
              to={RoutePath.main}
              className={cls.link}
            >
              <HomeIcon className={cls.icon} />
              <span className={cls.linkText}>{t('Главная')}</span>
            </AppLink>
          </li>
          <li>
            <AppLink
              theme={AppLinkTheme.SECONDARY}
              to={RoutePath.about}
              className={cls.link}
            >
              <InfoIcon className={cls.icon} />
              <span className={cls.linkText}>{t('О сайте')}</span>
            </AppLink>
          </li>
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
        {collapsed ? '>' : '<'}
      </Button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher isShort={collapsed} />
      </div>
    </div>
  );
};
