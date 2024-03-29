import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserAvatar, getUserDataLoadingStatus } from 'entities/Lesta/index';
import defaultAvatar from 'shared/assets/images/default_avatar2.jpg';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './UserAvatar.module.scss';

interface UserAvatarProps {
  className?: string;
}

export const UserAvatar = memo((props: UserAvatarProps) => {
  const { className } = props;
  const userAvatar = useSelector(getUserAvatar);
  const { t } = useTranslation('userPage');
  const isUserDataLoading = useSelector(getUserDataLoadingStatus);

  if (isUserDataLoading) {
    return (
      <div className={classNames(cls.avatarWrapper, {}, [className])}>
        <Skeleton className={cls.avatar} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.avatarWrapper, {}, [className])}>
      <img
        className={cls.avatar}
        src={userAvatar ?? defaultAvatar}
        alt={t('Аватар пользователя')}
        loading="lazy"
      />
    </div>
  );
});
