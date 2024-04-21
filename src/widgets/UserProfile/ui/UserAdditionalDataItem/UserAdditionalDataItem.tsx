import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './UserAdditionalDataItem.module.scss';

interface UserAdditionalDataItemProps {
  label: string;
  value: string;
  className?: string;
}

export const UserAdditionalDataItem = memo((props: UserAdditionalDataItemProps) => {
  const { className, label, value } = props;

  return (
    <li className={classNames(cls.item, {}, [className])}>
      <span className={cls.label}>{label}</span>
      <span className={cls.value}>{value}</span>
    </li>
  );
});
