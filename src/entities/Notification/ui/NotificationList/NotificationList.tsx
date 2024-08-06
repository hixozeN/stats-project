import React, { useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Notification } from '../../model/types/notification';
import cls from './NotificationList.module.scss';

interface INotification {
  isOpen?: boolean;
  dropdownRef?: React.Ref<HTMLUListElement>,
  notifications?: Notification[];
  onClose?: () => void;
}

export const NotificationList = (props: INotification) => {
  const {
    isOpen, dropdownRef, notifications, onClose,
  } = props;

  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isOpen]);

  return (
    <div className={classNames(cls.popup, { [cls.popupOpened]: isOpen })}>
      <ul
        className={classNames(
          cls.notificationList,
        )}
        ref={dropdownRef}
        aria-label={t('NOTIFICATION_LABEL')}
      >
        {isOpen && notifications?.map((n) => (
          <NotificationItem key={n._id} notification={n} onClose={onClose} />
        ))}
        {!notifications?.length && <span>{t('NO_NEW_NOTIFICATIONS')}</span>}
      </ul>
    </div>
  );
};
