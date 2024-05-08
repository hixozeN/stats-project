import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Background.module.scss';
import DefaultBg from '../../assets/images/bg-octo.svg';

export type BackgroundTheme = 'default' | 'blur' | 'image';

interface BackgroundProps {
  theme?: BackgroundTheme;
  url?: string;
}

export const Background = memo((props: BackgroundProps) => {
  const { theme = 'default', url } = props;

  return (
    <div className={cls.overlay}>
      {theme === 'default' ? (
        <DefaultBg />
      ) : (
        <img
          src={url}
          className={classNames(cls.Background, {}, [cls[theme]])}
          alt="123"
        />
      )}
    </div>
  );
});
