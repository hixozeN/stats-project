import React, { ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation();

  return (
    <div
      className={classNames(
        cls.notification,
        { [cls.notificationOpened]: isOpen },
        [className],
      )}
      ref={dropdownRef}
      aria-label={t('NOTIFICATION_LABEL')}
    >
      {children}
    </div>
  );
};
