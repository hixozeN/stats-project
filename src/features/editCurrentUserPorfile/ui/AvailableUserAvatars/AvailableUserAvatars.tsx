import React, { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { IAvatars } from 'entities/User/index';
import { useTranslation } from 'react-i18next';
import {
  AvailableUserAvatarList,
} from '../AvailableUserAvatars/AvailableUserAvatarList';
import cls from './AvailableUserAvatars.module.scss';

interface AvailableUserAvatarsProps {
  className?: string;
  availableAvatars: IAvatars;
  onCloseModal?: () => void;
}

export const AvailableUserAvatars = memo((props: AvailableUserAvatarsProps) => {
  const { className, availableAvatars, onCloseModal } = props;
  const { t } = useTranslation('profile');

  return (
    <div className={classNames(cls.avatarsWrapper, {}, [className])}>
      {
        availableAvatars?.userOnly?.length > 0
        && (
          <AvailableUserAvatarList
            avatars={availableAvatars.userOnly}
            sectionName={t('USER_ONLY_AVATARS_SECTION_NAME')}
            onCloseModal={onCloseModal}
          />
        )
      }
      {
        availableAvatars?.roleOnly?.length > 0
        && (
          <AvailableUserAvatarList
            avatars={availableAvatars.roleOnly}
            sectionName={t('ROLE_ONLY_AVATARS_SECTION_NAME')}
            onCloseModal={onCloseModal}
          />
        )
      }
      {
        availableAvatars?.public?.length > 0
        && (
          <AvailableUserAvatarList
            avatars={availableAvatars.public}
            sectionName={t('DEFAULT_AVATARS_SECTION_NAME')}
            onCloseModal={onCloseModal}
          />
        )
      }
    </div>
  );
});
