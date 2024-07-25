import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './SessionLeaderboard.module.scss';

interface SessionLeaderboardProps {
  className?: string;
}

export const SessionLeaderboard = memo((props: SessionLeaderboardProps) => {
  const { className } = props;
  const { t } = useTranslation('rating');

  return (
    <div className={classNames(cls.SessionLeaderboard, {}, [className])}>
      <h3 className={cls.heading}>{t('WORKS_IN_PROGRESS')}</h3>
    </div>
  );
});
