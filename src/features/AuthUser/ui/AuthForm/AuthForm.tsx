import { classNames } from 'shared/lib/classNames/classNames';
import {
  memo, useCallback, useRef, useState,
} from 'react';
import { Logo } from 'shared/ui/Logo/Logo';
import Eye from 'shared/assets/icons/eye.svg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthState } from 'features/AuthUser/index';
import { authActions } from '../../model/slice/authSlice';
import cls from './AuthForm.module.scss';

interface IAuthFormProps {
  className?: string;
}

interface AuthFormType {
  isAuthActive: boolean;
  isRegActive: boolean;
}

export const AuthForm = memo((props: IAuthFormProps) => {
  const { className } = props;
  const { t } = useTranslation('auth');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [type, setType] = useState<AuthFormType>({ isAuthActive: true, isRegActive: false });
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { username, email, password } = useSelector(getAuthState);
  console.log(username, email, password);

  const onChangeUserMail = useCallback((e) => {
    const { value } = e.target;
    dispatch(authActions.setUserEmail(value));
  }, [dispatch]);
  const onChangeUserName = useCallback((e) => {
    const { value } = e.target;
    dispatch(authActions.setUserName(value));
  }, [dispatch]);
  const onChangeUserPassword = useCallback((e) => {
    const { value } = e.target;
    dispatch(authActions.setUserPassword(value));
  }, [dispatch]);

  const togglePasswordVisible = useCallback(() => {
    if (inputPasswordRef.current.getAttribute('type') === 'password') {
      inputPasswordRef.current.setAttribute('type', 'text');
      setPasswordVisible(true);
    } else {
      inputPasswordRef.current.setAttribute('type', 'password');
      setPasswordVisible(false);
    }
  }, []);

  const changeTab = useCallback((tabName) => {
    if (tabName === 'auth') {
      setType({ isAuthActive: true, isRegActive: false });
    } else {
      setType({ isAuthActive: false, isRegActive: true });
    }
  }, []);

  return (
    <form className={classNames(cls.AuthForm, {}, [className])}>
      <Logo theme="auth" />
      <div className={classNames(cls.tabWrapper)}>
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

      <fieldset className={cls.fieldset}>
        <input
          id="email"
          type="email"
          placeholder={t('Электронная почта')}
          className={classNames(cls.input, {}, [])}
          onChange={onChangeUserMail}
          value={email ?? ''}
        />
        {type.isRegActive && (
        <input
          id="name"
          type="text"
          placeholder={t('Никнейм')}
          className={classNames(cls.input, {}, [])}
          onChange={onChangeUserName}
          value={username ?? ''}
        />
        )}
        <label htmlFor="password" className={cls.inputWrapper}>
          <input
            ref={inputPasswordRef}
            id="password"
            type="password"
            placeholder={t('Пароль')}
            className={classNames(cls.input, {}, [cls.inputPassword])}
            onChange={onChangeUserPassword}
            value={password ?? ''}
          />
          <Eye
            className={classNames(cls.btnEye, { [cls.btnEyeActive]: isPasswordVisible })}
            onClick={togglePasswordVisible}
          />
          <span
            className={
              classNames(
                cls.forgotPasswordSpan,
                { [cls.forgotPasswordSpanInvisible]: type.isRegActive },
              )
          }
          >
            {t('Забыли пароль? ')}
            <Link className={classNames(cls.recoverPasswordLink)} to="/">
              {t('Восстановить')}
            </Link>
          </span>
        </label>
      </fieldset>

      <button
        type="submit"
        className={classNames(cls.submitBtn)}
      >
        {type.isAuthActive ? t('Войти') : t('Создать')}
      </button>
    </form>
  );
});
