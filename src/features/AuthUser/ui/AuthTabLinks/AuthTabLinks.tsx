import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './AuthTabLinks.module.scss';
import { AuthFormType } from '../AuthForm/AuthForm';

interface IAuthTabLinksProps {
  className?: string;
  type: AuthFormType;
  // eslint-disable-next-line no-unused-vars
  changeTab: (value: string) => void;
}

export const AuthTabLinks = memo(({ className, type, changeTab }: IAuthTabLinksProps) => {
  const { t } = useTranslation('auth');

  return (
    <div className={classNames(cls.AuthTabLinks, {}, [className])}>
      <div className={classNames(cls.tab)}>
        <button
          type="button"
          className={classNames(cls.tabBtn, { [cls.tabBtnActive]: type.isAuthActive })}
          onClick={() => changeTab('auth')}
        >
          {t('Войти')}
        </button>
        <hr className={classNames(cls.tabStatus, { [cls.tabActive]: type.isAuthActive })} />
      </div>

      <div className={classNames(cls.tab)}>
        <button
          className={classNames(cls.tabBtn, { [cls.tabBtnActive]: type.isRegActive })}
          type="button"
          onClick={() => changeTab('reg')}
        >
          {t('Регистрация')}
        </button>
        <hr className={classNames(cls.tabStatus, { [cls.tabActive]: type.isRegActive })} />
      </div>
    </div>
  );
});
