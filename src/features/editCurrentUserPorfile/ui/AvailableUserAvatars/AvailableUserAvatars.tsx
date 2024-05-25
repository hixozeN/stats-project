import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AvatarFullData } from 'entities/User';
import { AvailableUserAvatar } from './AvailableUserAvatar';
import cls from './AvailableUserAvatars.module.scss';

interface AvailableUserAvatarsProps {
  className?: string;
  avatars: AvatarFullData[];
  sectionName: string;
  onCloseModal: () => void;
}

export const AvailableUserAvatars = memo((props: AvailableUserAvatarsProps) => {
  const {
    className, avatars, sectionName, onCloseModal,
  } = props;

  return (
    <section className={cls.avatars} onScroll={(e) => e.preventDefault()}>
      <h2 className={cls.sectionHeading}>{sectionName}</h2>
      <ul className={classNames(cls.avatarList, {}, [className])}>
        {
          avatars?.map((avatar) => <AvailableUserAvatar key={avatar._id} avatar={avatar} onCloseModal={onCloseModal} />)
        }
      </ul>
    </section>
  );
});
