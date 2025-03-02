import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { UserRating } from 'widgets/UserProfile/ui/UserRating/UserRating';
import { UserSocialLinks } from 'widgets/UserProfile/ui/UserSocialLinks/UserSocialLinks';
import { UserPrimaryData } from 'widgets/UserProfile/ui/UserPrimaryData/UserPrimaryData';
import { UserAvatar } from '../../ui/UserAvatar/UserAvatar';
// import { UserPrivateDataList } from '../../ui/UserPrivateDataList/UserPrivateDataList';
import cls from './UserProfile.module.scss';

interface IUserStatsProfileProps {
  className?: string;
}

export const UserProfile = memo((props: IUserStatsProfileProps) => {
  const { className } = props;

  return (
    <section className={classNames(cls.UserStatsProfile, {}, [className])}>
      <UserAvatar />
      {/* Убрано, т.к. изменена логика работы с токенами лесты. */}
      {/* <UserPrivateDataList /> */}
      <UserPrimaryData />
      <UserSocialLinks />
      <UserRating />
    </section>
  );
});
