import React, { ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Notification.module.scss';

interface INotification {
  className?: string,
  isOpen?: boolean;
  children?: ReactNode,
  dropdownRef?: React.Ref<HTMLDivElement>,
}

export const Notification = (props: INotification) => {
  const {
    className, isOpen, dropdownRef, children,
  } = props;
  return (
    <div
      className={classNames(
        cls.notification,
        { [cls.notificationOpened]: isOpen },
        [className],
      )}
      ref={dropdownRef}
    >
      {children}
    </div>
  );
};
