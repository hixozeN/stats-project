import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoggedInStatus,
} from 'entities/User/model/selectors/getLoggedInStatus/getLoggedInStatus';
import { useCallback, useEffect, useState } from 'react';
import { userActions } from 'entities/User';
import LogoutIcon from 'shared/assets/icons/button/logout.svg';
import LoginIcon from 'shared/assets/icons/button/login.svg';
import { Button } from 'shared/ui/Button/Button';
import { getUserData } from 'entities/User/model/selectors/getUserData/getUserData';
import { ProfileSidebar } from 'widgets/ProfileSidebar';
import cls from './Navbar.module.scss';

interface INavbarProps {
  className?: string;
}

export function Navbar({ className }: INavbarProps) {
  const { t } = useTranslation('nav');
  const isLoggedIn = useSelector(getLoggedInStatus);
  const dispatch = useDispatch();
  const { authData } = useSelector(getUserData);
  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const handelClick = useCallback(() => {

  }, []);

  const handleClickUserName = useCallback(() => {
    setOpenMenu(!isOpenMenu);
  }, [isOpenMenu]);
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const handleWidth = () => {
      if (window.innerWidth > 768) {
        setMobile(false);
      } else {
        setMobile(true);
      }
    };

    handleWidth();
    window.addEventListener('resize', handleWidth);

    return () => window.removeEventListener('resize', handleWidth);
  }, [isMobile]);

  if (isLoggedIn) {
    const { username } = authData;
    return (
      <div className={cls.navWrapper}>

        <Button type="button" theme="icon" variant="notification" onClick={handelClick}>
          {/* ToDo: количество notification вынести в отдельный компонент из сайдбара и отсюда */}
          <span className={cls.notification}>
            2
          </span>
        </Button>

        {isOpenMenu && (
          <nav className={cls.menuProfile}>
            <ProfileSidebar />
          </nav>
        )}

        <Button type="button" theme="icon-right" variant="chevron-down" onClick={handleClickUserName}>
          <span className={cls.userName}>{username ?? ''}</span>
        </Button>
        <nav className={classNames(cls.Navbar, {}, [className])}>
          <AppLink
            theme={AppLinkTheme.PRIMARY}
            to={RoutePath.auth}
            onClick={onLogout}
          >
            <LogoutIcon />
          </AppLink>
        </nav>
      </div>
    );
  }

  return (
    <nav className={classNames(cls.Navbar, {}, [className])}>
      <AppLink
        theme={AppLinkTheme.BUTTON}
        to={RoutePath.auth}
        className={cls.addAccount}
        state={{ tab: 'reg' }}
      >
        {!isMobile && t('Создать аккаунт')}
      </AppLink>
      <AppLink
        theme={AppLinkTheme.PRIMARY}
        to={RoutePath.auth}
        state={{ tab: 'auth' }}
      >
        <LoginIcon />
      </AppLink>
    </nav>
  );
}
