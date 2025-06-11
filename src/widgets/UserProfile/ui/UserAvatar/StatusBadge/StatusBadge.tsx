import { getUserStatus } from 'entities/Lesta';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { BTooltip } from 'shared/ui/BTooltip/BTooltip';
import cls from './StatusBadge.module.scss';

interface StatusBadgeProps {
  className?: string;
}

export const StatusBadge = (props: StatusBadgeProps) => {
  const {
    className,
  } = props;

  const { t } = useTranslation('userPage');
  const isOnline = useSelector(getUserStatus);

  return (
    <BTooltip
      title={isOnline ? t('PLAYER_IS_ON_WEBSITE') : t('PLAYER_IS_OFFLINE')}
    >
      <span className={classNames(cls.statusBadge, {}, [className])}>
        <span
          className={classNames(cls.statusDot, { [cls.online]: isOnline }, [])}
        />
      </span>
    </BTooltip>
  );
};
