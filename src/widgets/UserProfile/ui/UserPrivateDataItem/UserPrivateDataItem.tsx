import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './UserPrivateDataItem.module.scss';

interface UserPrivateDataItemProps {
  variant: 'gold' | 'credits' | 'premium' | 'free_xp';
  value: number;
  className?: string;
}

export const UserPrivateDataItem = memo((props: UserPrivateDataItemProps) => {
  const {
    className, variant, value,
  } = props;

  const formatValue = (v: number, type: string): string => {
    if (type === 'premium') {
      const currentDate = new Date();
      const targetDate = new Date(v * 1000); // Умножаем на 1000, так как UNIX timestamp передан в секундах

      const timeDifference = targetDate.getTime() - currentDate.getTime();

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      let result = '';

      if (days > 0) {
        result += `${days}д.`;
      }

      if (hours > 0) {
        result += ` ${hours}ч.`;
      }

      if (days <= 0 && hours <= 0) {
        result += '0д. 0ч.';
      }

      return result;
    }
    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <li className={classNames(cls.privateElement, {}, [className, cls[variant]])}>
      <span>{formatValue(value, variant)}</span>
    </li>
  );
});
