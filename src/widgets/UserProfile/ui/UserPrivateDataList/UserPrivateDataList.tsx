import {
  memo, ReactNode,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './UserPrivateDataList.module.scss';

interface UserPrivateDataListProps {
  children: ReactNode;
  className?: string;
}

export const UserPrivateDataList = memo((props: UserPrivateDataListProps) => {
  const { className, children } = props;

  return (
    <ul className={classNames(cls.privateData, {}, [className])}>
      {children}
    </ul>
  );
});
