import { memo, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import { markNotificationAsRead } from 'entities/Notification/api/notificationApi';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useInView } from 'react-intersection-observer';
import { REGEX_PROJECT_URL } from 'shared/consts/global';
import { Notification } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';

interface NotificationProps {
  notification: Notification;
  className?: string;
  onClose?: () => void;
}

export const NotificationItem = memo((props: NotificationProps) => {
  const { className, notification, onClose } = props;
  const notificationDate = formatDate(notification.timestamp);
  const dispatch = useAppDispatch();

  const { ref, inView } = useInView({
    threshold: 0.9,
  });

  useEffect(() => {
    if (inView && !notification.isRead) dispatch(markNotificationAsRead({ id: notification._id }));
  }, [inView, dispatch, notification]);

  const content = (
    <div className={classNames(cls.contentWrapper)}>
      {!notification.isRead && <span className={cls.unread} /> }
      <h5 className={cls.title}>
        {notification.title}
      </h5>
      <p
        className={cls.content}
      >
        {notification.content}
      </p>
      <span className={cls.timestamp}>{notificationDate}</span>
    </div>
  );

  if (notification.href) {
    return (
      <li
        className={classNames(cls.NotificationItem, {}, [cls.clickable])}
        ref={ref}
        onClick={onClose}
      >
        <Link
          className={cls.link}
          to={notification.href}
          target={REGEX_PROJECT_URL.test(notification.href) ? '_self' : '_blank'}
        >
          {content}
        </Link>
      </li>
    );
  }

  return (
    <li className={classNames(cls.NotificationItem, {}, [className])} ref={ref}>
      {content}
    </li>
  );
});
