import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { UserProfileFormInput } from 'entities/User/ui/UserProfileFormInput/UserProfileFormInput';
import { Button } from 'shared/ui/Button/Button';
import cls from './UserProfileForm.module.scss';

interface IUserProfileFormProps {
  className?: string;
}

export const UserProfileForm = memo(({ className }: IUserProfileFormProps) => {
  const { t } = useTranslation('profile');

  return (
    <form className={classNames(cls.UserProfileForm, {}, [className])}>
      <div className={cls.wrapper}>
        <div className={cls.inputsWrapper}>

          <h2 className={cls.heading}>{t('Основная информация')}</h2>
          <UserProfileFormInput
            id="uuid"
            text="37589023"
            label="ID"
            isCopyable
          />
          <UserProfileFormInput
            id="nickname"
            type="text"
            value="6paTyxa_6e3_CkuJIJIyxu"
            placeholder={t('Никнейм')}
            label={t('Никнейм')}
          />
          <UserProfileFormInput
            id="bio"
            textarea
            placeholder={t('Описание или несколько фактов о себе')}
            label={t('Био')}
          />
        </div>
        <div className={cls.avatarWrapper}>
          <img
            className={cls.avatar}
            src="https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png"
            alt={t('Аватар пользователя')}
          />
          <Button theme="clear" className={cls.avatarChangeSpan}>{t('Изменить')}</Button>
        </div>
      </div>
      <div className={cls.sectionSplit} />
      <div className={cls.inputsWrapper}>
        <h2 className={cls.heading}>{t('Электронная почта')}</h2>
        <UserProfileFormInput
          id="email"
          type="email"
          label={t('Почта')}
          value="aljkeee@gmail.com"
          placeholder={t('Введите адрес почты')}
        />
      </div>
      <div className={cls.sectionSplit} />
      <div className={cls.inputsWrapper}>
        <h2 className={cls.heading}>{t('Discord')}</h2>
        <UserProfileFormInput
          id="discord"
          type="text"
          label={t('Аккаунт')}
          value="reactdeveloper#4444"
          placeholder={t('Введите логин в discord')}
        />
      </div>
      <div className={cls.submitBtnWrapper}>
        <span className={cls.error}>{t('Тестовая ошибка')}</span>
        <Button type="submit" variant="save" size="size_m">{t('Сохранить')}</Button>
      </div>
    </form>
  );
});
