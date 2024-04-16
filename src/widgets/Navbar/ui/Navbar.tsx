import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useSelector } from 'react-redux';
import { getLoggedInStatus, getUserData } from 'entities/User';
import React, {
  memo, useCallback, useEffect, useRef, useState,
} from 'react';
import LoginIcon from 'shared/assets/icons/button/login.svg';
import { Button } from 'shared/ui/Button/Button';
import { useSizeScreen } from 'shared/hooks/useSizeScreen';
import { Menu } from 'shared/ui/Menu';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import { Notification } from 'entities/Notification';
import cls from './Navbar.module.scss';

interface INavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: INavbarProps) => {
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const isLoggedIn = useSelector(getLoggedInStatus);
  const userData = useSelector(getUserData);
  const { t } = useTranslation('nav');
  const { width } = useSizeScreen();
  const notificationRef = useRef(null);
  const profileDropdownRef = useRef(null);

  useClickOutside(notificationRef, () => {
    if (!isOpenPopup) return null;
    if (isOpenPopup) setTimeout(() => setIsOpenPopup(false), 150);
    return null;
  });

  useClickOutside(profileDropdownRef, () => {
    if (!isOpenMenu) return null;
    if (isOpenMenu) setTimeout(() => setOpenMenu(false), 150);
    return null;
  });

  const handleClickMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const handleClickUserName = useCallback(() => {
    setOpenMenu(!isOpenMenu);
  }, [isOpenMenu]);

  useEffect(() => {
    if (width > 768) {
      setMobile(false);
    } else {
      setMobile(true);
    }
  }, [isMobile, width]);

  if (isLoggedIn) {
    return (
      <>
        <div className={cls.navWrapper}>
          <Button
            type="button"
            theme="icon"
            variant="notification"
            onClick={() => setIsOpenPopup(!isOpenPopup)}
          />

          <nav
            className={classNames(
              cls.menuProfile,
              { [cls.open]: isOpenMenu },
              [],
            )}
            ref={profileDropdownRef}
          >
            <Menu theme="navbar" cb={handleClickMenu} />
          </nav>

          <Button
            type="button"
            theme="icon-right"
            variant="chevron-down"
            onClick={handleClickUserName}
          >
            <span className={cls.userName}>{userData?.username ?? ''}</span>
          </Button>
        </div>
        <Notification isOpen={isOpenPopup} dropdownRef={notificationRef}>
          <span>{t('Нет уведомлений')}</span>
        </Notification>
      </>
    );
  }

  return (
    <nav className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.navWrapper}>
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
      </div>
    </nav>
  );
});
