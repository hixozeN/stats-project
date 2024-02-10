import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useSizeScreen } from 'shared/hooks/useSizeScreen';
import { useTranslation } from 'react-i18next';
import cls from './TeamList.module.scss';

/* eslint-disable i18next/no-literal-string */

interface TeamListProps {
  className?: string;
}

export const TeamList = memo(({ className }: TeamListProps) => {
  const { width } = useSizeScreen();
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.teams, {}, [className])}>
      <p className={cls.teamCount}>36 команд зарегистрированы:</p>
      <ul className={cls.teamList}>
        <li className={cls.teamItem}>
          <img
            className={cls.teamLogo}
            src="https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png"
            alt="Логотип команды"
          />
          <p className={cls.teamName}>teamEbalai</p>
          <span className={cls.teamRating}>1700</span>
        </li>
        <li className={cls.teamItem}>
          <img
            className={cls.teamLogo}
            src="https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png"
            alt="Логотип команды"
          />
          <p className={cls.teamName}>teamEbalaiteamEbalai</p>
          <span className={cls.teamRating}>1700</span>
        </li>
        <li className={cls.teamItem}>
          <img
            className={cls.teamLogo}
            src="https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png"
            alt="Логотип команды"
          />
          <p className={cls.teamName}>teamEbalai</p>
          <span className={cls.teamRating}>1700</span>
        </li>
        <li className={cls.teamItem}>
          <img
            className={cls.teamLogo}
            src="https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png"
            alt="Логотип команды"
          />
          <p className={cls.teamName}>teamEbalai</p>
          <span className={cls.teamRating}>1700</span>
        </li>
      </ul>
      {
        width > 900
          ? <Button className={cls.joinBtn} variant="join" size="size_m">{t('Подать заявку')}</Button>
          : <Button className={cls.joinBtn} variant="join" />
      }
    </div>
  );
});
