import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './VehicleLeaderboard.module.scss';

interface VehicleLeaderboardProps {
  className?: string;
}

export const VehicleLeaderboard = memo((props: VehicleLeaderboardProps) => {
  const { className } = props;
  const { t } = useTranslation('rating');

  return (
    <div className={classNames(cls.VehicleLeaderboard, {}, [className])}>
      <h3 className={cls.heading}>{t('WORKS_IN_PROGRESS')}</h3>
    </div>
  );
});
