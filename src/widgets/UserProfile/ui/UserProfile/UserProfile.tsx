import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import defaultAvatar from 'shared/assets/images/default_avatar2.jpg';
import { useSelector } from 'react-redux';
import {
  getUserAvatar,
} from 'entities/Lesta';
import { UserRating } from 'widgets/UserProfile/ui/UserRating/UserRating';
import { UserSocialLinks } from 'widgets/UserProfile/ui/UserSocialLinks/UserSocialLinks';
import { UserPrimaryData } from 'widgets/UserProfile/ui/UserPrimaryData/UserPrimaryData';
import { useTranslation } from 'react-i18next';
import { UserPrivateDataList } from '../../ui/UserPrivateDataList/UserPrivateDataList';
import cls from './UserProfile.module.scss';

interface IUserStatsProfileProps {
  className?: string;
}

export const UserProfile = memo((props: IUserStatsProfileProps) => {
  const { className } = props;
  const { t } = useTranslation('userPage');

  const userAvatar = useSelector(getUserAvatar);

  return (
    <section className={classNames(cls.UserStatsProfile, {}, [className])}>
      <div className={cls.avatarWrapper}>
        <img
          className={cls.avatar}
          src={userAvatar ?? defaultAvatar}
          alt={t('Аватар пользователя')}
          loading="lazy"
        />
      </div>
      <UserPrivateDataList />
      <UserPrimaryData />
      <UserSocialLinks />
      <UserRating />
    </section>
  );
});
