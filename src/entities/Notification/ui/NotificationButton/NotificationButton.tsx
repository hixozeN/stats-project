import React, {
  memo, useCallback, useRef, useState,
} from 'react';
import { Button } from 'shared/ui/Button/Button';
import { NotificationList } from 'entities/Notification/index';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import { useNotifications } from 'entities/Notification/api/notificationApi';
import cls from './NotificationButton.module.scss';

export const NotificationButton = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef(null);
  const { data: notifications } = useNotifications(null, { pollingInterval: 60000 });

  useClickOutside(notificationRef, () => {
    if (!isOpen) return null;
    if (isOpen) setTimeout(() => setIsOpen(false), 150);
    return null;
  });

  const handleCloseNotifications = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const unreadNotificationsCount = notifications?.reduce((acc, n) => {
    if (!n.isRead) acc += 1;
    return acc;
  }, 0);

  return (
    <div className={cls.notificationWrapper}>
      {unreadNotificationsCount > 0 && <span className={cls.notification} data-badge={unreadNotificationsCount} />}
      <Button
        type="button"
        theme="icon"
        variant="notification"
        onClick={() => setIsOpen(!isOpen)}
      />
      <NotificationList
        isOpen={isOpen}
        onClose={handleCloseNotifications}
        dropdownRef={notificationRef}
        notifications={notifications}
      />
    </div>
  );
});
