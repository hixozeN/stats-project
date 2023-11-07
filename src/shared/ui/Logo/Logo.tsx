import { classNames } from 'shared/lib/classNames/classNames';
import { useNavigate } from 'react-router-dom';
import cls from './Logo.module.scss';
import Star from '../../assets/icons/star.svg';
import LogoText from '../../assets/icons/battlestar.svg';

export type LogoTheme = 'header' | 'auth' | 'footer';

interface ILogoProps {
  className?: string;
  theme: LogoTheme;
}

export function Logo({ className, theme }: ILogoProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/')}
      className={classNames(cls.Logo, {}, [className, cls[theme]])}
    >
      <Star className={classNames(cls.image, {}, [cls[theme]])} />
      <LogoText className={classNames(cls.text, {}, [cls[theme]])} />
    </div>
  );
}
