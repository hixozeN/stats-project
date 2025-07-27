import { getUserAvatar, getUserDataLoadingStatus } from 'entities/Lesta';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import defaultAvatar from 'shared/assets/images/default_avatar_resized.webp';
import { DEFAULT_USER_AVATAR } from 'shared/consts/global';
import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { StatusBadge } from './StatusBadge/StatusBadge';
import cls from './UserAvatar.module.scss';

interface UserAvatarProps {
  className?: string;
}

export const UserAvatar = memo((props: UserAvatarProps) => {
  const { className } = props;
  const userAvatar = useSelector(getUserAvatar);
  const { t } = useTranslation('userPage');
  const isUserDataLoading = useSelector(getUserDataLoadingStatus);

  const getAvatarLink = () => {
    if (userAvatar === DEFAULT_USER_AVATAR) {
      return defaultAvatar;
    }

    return userAvatar ?? defaultAvatar;
  };

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
        src={getAvatarLink()}
        alt={t('Аватар пользователя')}
      />
      <StatusBadge />
    </div>
  );
});
