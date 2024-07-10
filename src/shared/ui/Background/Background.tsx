import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Background.module.scss';

export type BackgroundTheme = 'default' | 'blur' | 'image';

interface BackgroundProps {
  theme?: BackgroundTheme;
  url?: string;
}

export const Background = memo((props: BackgroundProps) => {
  const {
    theme = 'default',
    url,
  } = props;

  const isDefault = theme === 'default';

  return (
    <div className={classNames(cls.overlay, { [cls.default]: isDefault })}>
      {!isDefault
        && (
          <img
            src={url}
            className={classNames(cls.Background, {}, [cls[theme]])}
            alt="123"
          />
        )}
    </div>
  );
});
