import { memo, useCallback } from 'react';
import { AvatarFullData } from 'entities/User';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useToasts } from 'shared/hooks/useToasts/useToasts';
import { useTranslation } from 'react-i18next';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { patchCurrentUserAvatar } from '../../model/services/patchCurrentUserAvatar';
import cls from './AvailableUserAvatars.module.scss';

interface AvailableUserAvatarProps {
  avatar: AvatarFullData;
  onCloseModal: () => void;
}

export const AvailableUserAvatar = memo((props: AvailableUserAvatarProps) => {
  const { avatar, onCloseModal } = props;
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const { toastSuccess, toastWithError } = useToasts();

  const handleUpdateAvatar = useCallback((id: string) => {
    dispatch(patchCurrentUserAvatar({ avatarId: id }))
      .unwrap()
      .then(() => {
        toastSuccess(t('AVATAR_SUCCESSFUL_UPDATED'));
        onCloseModal();
      })
      .catch((e) => toastWithError(e?.response?.data?.message || SERVER_ERROR_MESSAGE));
  }, [dispatch, toastSuccess, toastWithError, t, onCloseModal]);

  return (
    <li className={cls.avatarItem} key={avatar._id} onClick={() => handleUpdateAvatar(avatar._id)}>
      <img className={cls.avatarImage} src={avatar.image} alt={avatar.name} />
      <span className={cls.avatarName}>{avatar.name}</span>
    </li>
  );
});
