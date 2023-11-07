import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import cls from './Navbar.module.scss';

interface INavbarProps {
  className?: string;
}

export function Navbar({ className }: INavbarProps) {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links}>
        <AppLink
          theme={AppLinkTheme.PRIMARY}
          to={RoutePath.main}
        >
          {t('Главная')}
        </AppLink>

        <AppLink
          theme={AppLinkTheme.PRIMARY}
          to={RoutePath.about}
        >
          {t('О сайте')}
        </AppLink>

        <AppLink
          theme={AppLinkTheme.PRIMARY}
          to={RoutePath.auth}
        >
          {t('Авторизация')}
        </AppLink>
      </div>
    </div>
  );
}
