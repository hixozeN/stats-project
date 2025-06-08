import { FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getUserOnlineStatus } from 'entities/Lesta';
import cls from './StatusBadge.module.scss';

interface IStatusBadgeProps {
  className?: string;
}

export const StatusBadge: FC<IStatusBadgeProps> = (props) => {
  const {
    className,
  } = props;

  const isOnline = useSelector(getUserOnlineStatus);

  return (
    <span className={classNames(cls.statusBadge, {}, [className])}>
      <span className={classNames(cls.statusDot, { [cls.online]: isOnline }, [])} />
    </span>
  );
};
