import { classNames } from 'shared/lib/classNames/classNames';
import {
  FormEvent,
  memo, useCallback, useEffect, useRef, useState,
} from 'react';
import { Logo } from 'shared/ui/Logo/Logo';
import Eye from 'shared/assets/icons/eye.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'app/providers/ErrorBoundary/index';
import {
  getLoggedInStatus,
} from 'entities/User/model/selectors/getLoggedInStatus/getLoggedInStatus';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AuthInput } from 'features/AuthUser/ui/AuthInput/AuthInput';
import { AuthTabLinks } from 'features/AuthUser/ui/AuthTabLinks/AuthTabLinks';
import { loginByEmail } from '../../model/services/loginByEmail/loginByEmail';
import { getAuthState } from '../../model/selectors/getAuthState/getAuthState';
import { authActions } from '../../model/slice/authSlice';
import cls from './AuthForm.module.scss';

interface IAuthFormProps {
  className?: string;
}

export interface AuthFormType {
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
  const {
    username, email, password, error, isLoading,
  } = useSelector(getAuthState);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(getLoggedInStatus);

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

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type.isAuthActive) {
      await dispatch(loginByEmail({ email, password }));
    }
  }, [dispatch, password, email, type]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(RoutePath.main);
    }
  }, [isLoggedIn, navigate]);

  return (
    <ErrorBoundary>
      <form className={classNames(cls.AuthForm, {}, [className])} onSubmit={handleSubmit}>
        <div className={cls.formWrapper}>
          <Logo theme="auth" />
          <AuthTabLinks type={type} changeTab={changeTab} />

          <fieldset className={cls.fieldset}>
            <AuthInput
              id="email"
              type="email"
              placeholder={t('Электронная почта')}
              onChange={onChangeUserMail}
              value={email ?? ''}
            />

            {type.isRegActive && (
              <AuthInput
                id="name"
                type="text"
                placeholder={t('Никнейм')}
                onChange={onChangeUserName}
                value={username ?? ''}
              />
            )}

            <label htmlFor="password" className={cls.inputWrapper}>
              <AuthInput
                ref={inputPasswordRef}
                id="password"
                type="password"
                placeholder={t('Пароль')}
                onChange={onChangeUserPassword}
                value={password ?? ''}
                className={cls.inputPassword}
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
        </div>

        <div className={cls.submitWrapper}>
          <button
            type="submit"
            disabled={isLoading}
            className={classNames(cls.submitBtn)}
          >
            {type.isAuthActive ? t('Войти') : t('Создать')}
          </button>
          <span className={cls.errorMessage}>{error}</span>
        </div>
      </form>
    </ErrorBoundary>
  );
});
