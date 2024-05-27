import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, {
  memo, useCallback, useEffect, useState,
} from 'react';
import { Button } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getUpdateProfileError, getUserData, IAvatars } from 'entities/User';
import { useForm, Controller, FieldErrors } from 'react-hook-form';
import { useToasts } from 'shared/hooks/useToasts/useToasts';
import { VALIDATION_MESSAGES } from 'shared/consts/validationMessages';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { Modal } from 'shared/ui/Modal/Modal';
import { $royalApi } from 'shared/api/royalApi';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { ConnectDiscord } from '../ConnectDiscord/ConnectDiscord';
import { patchCurrentUser } from '../../model/services/patchCurrentUser';
import { removeUrl } from '../../lib/removeUrl';
import { UserProfileFormInput } from '../UserProfileFormInput/UserProfileFormInput';
import cls from './UserProfileForm.module.scss';
import {
  UserProfileFormTextArea,
} from '../UserProfileFormTextArea/UserProfileFormTextArea';
import {
  ProfileFormInputs,
  ProfileFormInputsEnum,
} from '../../model/types/form';
import {
  AvailableUserAvatars,
} from '../AvailableUserAvatars/AvailableUserAvatars';

interface IUserProfileFormProps {
  className?: string;
}

export const UserProfileForm = memo(({ className }: IUserProfileFormProps) => {
  const { t } = useTranslation('profile');
  const currentUser = useSelector(getUserData);
  const error = useSelector(getUpdateProfileError);
  const [isModalOpened, setModalOpened] = useState(false);
  const [availableAvatars, setAvailableAvatars] = useState<IAvatars>(
    { public: null, roleOnly: null, userOnly: null },
  );
  const {
    handleSubmit, control, formState: { isLoading },
  } = useForm<ProfileFormInputs>({
    defaultValues: {
      [ProfileFormInputsEnum.BIO]: currentUser.bio ?? '',
      [ProfileFormInputsEnum.EMAIL]: currentUser.email,
      [ProfileFormInputsEnum.DISCORD]: currentUser.discord ?? '',
      [ProfileFormInputsEnum.VK]: currentUser.vk ? `https://vk.com/${currentUser.vk}` : '',
      [ProfileFormInputsEnum.TELEGRAM]: currentUser.telegram ? `https://t.me/${currentUser.telegram}` : '',
      [ProfileFormInputsEnum.YOUTUBE]: currentUser.youtube ? `https://youtube.com/@${currentUser.youtube}` : '',
    },
    mode: 'all',
  });
  const { toastWithError } = useToasts();
  const dispatch = useAppDispatch();

  useEffect(() => {
    $royalApi.get<IAvatars>('/avatars/available')
      .then(({ data }) => {
        setAvailableAvatars(data);
      })
      .catch((err) => toastWithError(err?.message || SERVER_ERROR_MESSAGE));
  }, [toastWithError]);

  const onError = (data: FieldErrors<ProfileFormInputs>) => {
    const keys = Object.keys(data) as (keyof ProfileFormInputs)[];

    keys.forEach((key) => {
      toastWithError(data[key].message);
    });
  };

  const onSubmit = async (data: ProfileFormInputs) => {
    await dispatch(patchCurrentUser({
      ...data,
      vk: removeUrl(data.vk),
      telegram: removeUrl(data.telegram),
      youtube: removeUrl(data.youtube),
    }));
  };

  const handleModalWithAvatarsClose = useCallback(() => setModalOpened(false), []);

  return (
    <>
      <form
        className={classNames(cls.UserProfileForm, {}, [className])}
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
      >
        <div className={cls.wrapper}>
          <div className={cls.inputsWrapper}>

            <h2 className={cls.heading}>{t('Основная информация')}</h2>
            <UserProfileFormInput
              id={ProfileFormInputsEnum.ID}
              text={currentUser.lestaData?.account_id ?? currentUser._id}
              label={t('ID')}
              isCopyable
            />
            <UserProfileFormInput
              id={ProfileFormInputsEnum.USERNAME}
              text={currentUser.lestaData?.nickname ?? currentUser.username}
              label={t('Никнейм')}
              isCopyable
            />
            <Controller
              name={ProfileFormInputsEnum.BIO}
              render={({ field }) => (
                <UserProfileFormTextArea
                  id={ProfileFormInputsEnum.BIO}
                  placeholder={t('Описание или несколько фактов о себе')}
                  label={t('Био')}
                  maxLength={150}
                  {...field}
                />
              )}
              control={control}
            />
          </div>
          <div className={cls.avatarWrapper} onClick={() => setModalOpened(true)} tabIndex={0} role="button">
            <img
              className={cls.avatar}
              src={currentUser.avatar}
              alt={t('Аватар пользователя')}
            />
            <Button
              theme="clear"
              className={cls.avatarChangeSpan}
            >
              {t('Изменить')}
            </Button>
          </div>
        </div>
        <div className={cls.sectionSplit} />
        <div className={cls.inputsWrapper}>
          <h2 className={cls.heading}>{t('Электронная почта')}</h2>
          <Controller
            name={ProfileFormInputsEnum.EMAIL}
            rules={{
              required: VALIDATION_MESSAGES.REQUIRED,
              pattern: {
                value: /\S+@\S+\.\S+$/,
                message: VALIDATION_MESSAGES.INCORRECT_EMAIL,
              },
            }}
            render={({ field, fieldState }) => (
              <UserProfileFormInput
                id={ProfileFormInputsEnum.EMAIL}
                type={ProfileFormInputsEnum.EMAIL}
                label={t('Почта')}
                placeholder={t('Введите адрес почты')}
                isError={fieldState.invalid}
                isDirty={fieldState.isDirty}
                {...field}
              />
            )}
            control={control}
          />
        </div>
        <div className={cls.sectionSplit} />
        <div className={cls.inputsWrapper}>
          <h2 className={cls.heading}>{t('SOCIAL_SECTION')}</h2>
          <Controller
            name={ProfileFormInputsEnum.VK}
            rules={{
              maxLength: 47,
              pattern: {
                value: /^https:\/\/vk\.com\/.+$/,
                message: VALIDATION_MESSAGES.INCORRECT_VK,
              },
            }}
            render={({ field, fieldState }) => (
              <UserProfileFormInput
                id={ProfileFormInputsEnum.VK}
                label={t('VK')}
                placeholder={t('VK_PLACEHOLDER')}
                isError={fieldState.invalid}
                isDirty={fieldState.isDirty}
                {...field}
              />
            )}
            control={control}
          />
          <Controller
            name={ProfileFormInputsEnum.TELEGRAM}
            rules={{
              maxLength: 45,
              pattern: {
                value: /^https:\/\/t\.me\/.*/,
                message: VALIDATION_MESSAGES.INCORRECT_TG,
              },
            }}
            render={({ field, fieldState }) => (
              <UserProfileFormInput
                id={ProfileFormInputsEnum.TELEGRAM}
                label={t('Telegram')}
                placeholder={t('TG_PLACEHOLDER')}
                isError={fieldState.invalid}
                isDirty={fieldState.isDirty}
                {...field}
              />
            )}
            control={control}
          />
          <Controller
            name={ProfileFormInputsEnum.YOUTUBE}
            rules={{
              maxLength: 55,
              pattern: {
                value: /^https:\/\/youtube\.com\/@.*/,
                message: VALIDATION_MESSAGES.INCORRECT_YT,
              },
            }}
            render={({ field, fieldState }) => (
              <UserProfileFormInput
                id={ProfileFormInputsEnum.YOUTUBE}
                label={t('YouTube')}
                placeholder={t('YT_PLACEHOLDER')}
                isError={fieldState.invalid}
                isDirty={fieldState.isDirty}
                {...field}
              />
            )}
            control={control}
          />
          <ConnectDiscord isConnected={!!currentUser.discord} />
        </div>
        <div className={cls.submitBtnWrapper}>
          <span className={cls.error}>{error}</span>
          <Button
            type="submit"
            variant="save"
            size="size_m"
            disabled={isLoading}
          >
            {t('Сохранить')}
          </Button>
        </div>
      </form>
      <Modal isOpen={isModalOpened} onClose={handleModalWithAvatarsClose} className={cls.modal}>
        <AvailableUserAvatars availableAvatars={availableAvatars} onCloseModal={handleModalWithAvatarsClose} />
      </Modal>
    </>
  );
});
