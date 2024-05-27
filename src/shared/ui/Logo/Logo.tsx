import { classNames } from 'shared/lib/classNames/classNames';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './Logo.module.scss';
import Crown from '../../assets/icons/crown.svg';
import LogoText from '../../assets/icons/RoyalArena.svg';

export type LogoTheme = 'header' | 'auth' | 'footer';

interface ILogoProps {
  className?: string;
  theme: LogoTheme;
  withoutCrown?: boolean,
  onClick?: () => void
}

export function Logo({
  className,
  theme,
  withoutCrown,
  onClick,
}: ILogoProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClickLogo = () => {
    if (pathname === RoutePath.auth && withoutCrown) {
      onClick();
    } else {
      navigate('/');
    }
  };

  return (
    <div
      onClick={handleClickLogo}
      className={classNames(cls.Logo, {}, [className, cls[theme]])}
    >
      {!withoutCrown && <Crown className={classNames(cls.image, {}, [cls[theme]])} />}
      <LogoText className={classNames(cls.text, {}, [cls[theme]])} />
    </div>
  );
}
