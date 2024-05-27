import { classNames } from 'shared/lib/classNames/classNames';
import {
  memo,
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Logo } from 'shared/ui/Logo/Logo';
import Eye from 'shared/assets/icons/eye.svg';
// import LestaLogo from 'shared/assets/icons/logo_lesta.svg';
import { getLoggedInStatus } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ReducerList, useDynamicReducerLoader } from 'shared/hooks/useDynamicReducerLoader/useDynamicReducerLoader';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { VALIDATION_MESSAGES } from 'shared/consts/validationMessages';
import { Button } from 'shared/ui/Button/Button';
import { getAuthError, getAuthLoading } from '../../model/selectors';
import { authUserService } from '../../model/services/authUserService/authUserService';
import { authReducer } from '../../model/slice/authSlice';
import { AuthInput } from '../AuthInput/AuthInput';
import { AuthTabLinks } from '../AuthTabLinks/AuthTabLinks';
import cls from './AuthForm.module.scss';

export interface IAuthFormProps {
  className?: string;
  setIsBlitzAuth: (state: boolean) => void;
}

export interface AuthFormType {
  isAuthActive: boolean;
  isRegActive: boolean;
}

type TabName = 'auth' | 'reg';

interface AuthFormInputs {
  email?: string;
  nickname?: string;
  password?: string;
}

enum FormInputs {
  EMAIL = 'email',
  NICKNAME = 'nickname',
  PASSWORD = 'password',
}

const initialReducers: ReducerList = { authForm: authReducer };

export const AuthForm = memo((props: IAuthFormProps) => {
  const { className, setIsBlitzAuth } = props;
  const { t } = useTranslation('auth');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [type, setType] = useState<AuthFormType>({
    isAuthActive: true,
    isRegActive: false,
  });
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    formState: {
      errors,
      isValid,
    },
    control,
    reset,
  } = useForm<AuthFormInputs>({
    defaultValues: {
      [FormInputs.EMAIL]: '',
      [FormInputs.NICKNAME]: '',
      [FormInputs.PASSWORD]: '',
    },
    mode: 'all',
  });

  useDynamicReducerLoader({ reducers: initialReducers });

  const dispatch = useAppDispatch();
  const error = useSelector(getAuthError);
  const isLoading = useSelector(getAuthLoading);
  const isLoggedIn = useSelector(getLoggedInStatus);

  const navigate = useNavigate();
  const { state } = useLocation();

  const togglePasswordVisible = useCallback(() => {
    if (inputPasswordRef.current.getAttribute('type') === FormInputs.PASSWORD) {
      inputPasswordRef.current.setAttribute('type', 'text');
      setPasswordVisible(true);
    } else {
      inputPasswordRef.current.setAttribute('type', FormInputs.PASSWORD);
      setPasswordVisible(false);
    }
  }, []);

  const changeTab = useCallback((tabName: TabName) => {
    reset();
    if (tabName === 'auth') {
      setType({
        isAuthActive: true,
        isRegActive: false,
      });
    } else {
      setType({
        isAuthActive: false,
        isRegActive: true,
      });
    }
  }, [reset]);

  const onSubmit = useCallback(async (data: AuthFormInputs) => {
    const {
      nickname,
      password,
      email,
    } = data;
    if (type.isAuthActive) {
      await dispatch(authUserService({
        email,
        password,
        variant: 'login',
      }));
    } else {
      await dispatch(authUserService({
        email,
        username: nickname,
        password,
        variant: 'registration',
      }));
    }
  }, [type, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(RoutePath.main);
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (state) {
      if (state.tab === 'reg') {
        changeTab('reg');
      }
    }
  }, [changeTab, state]);

  const renderTextInButton = useCallback(() => {
    if (isLoading) return <span className={cls.loader} />;
    return type.isAuthActive ? t('Войти') : t('Создать');
  }, [isLoading, type, t]);

  return (
    <form className={classNames(cls.AuthForm, {}, [className])} onSubmit={handleSubmit(onSubmit)}>
      <div className={cls.formWrapper}>
        <Logo theme="auth" />
        <AuthTabLinks type={type} changeTab={changeTab} />

        <fieldset className={cls.fieldset}>
          <Controller
            name="email"
            rules={{
              required: VALIDATION_MESSAGES.REQUIRED,
              pattern: {
                value: /\S+@\S+\.\S+$/,
                message: VALIDATION_MESSAGES.INCORRECT_EMAIL,
              },
            }}
            render={({ field }) => (
              <AuthInput
                placeholder={t('Электронная почта')}
                error={errors.email?.message}
                isError={!!errors.email?.message}
                {...field}
              />
            )}
            control={control}
          />

          {type.isRegActive && (
            <Controller
              name="nickname"
              rules={{
                required: VALIDATION_MESSAGES.REQUIRED,
                minLength: {
                  value: 3,
                  message: `${VALIDATION_MESSAGES.MIN_LENGTH} 3`,
                },
              }}
              render={({ field }) => (
                <AuthInput
                  placeholder={t('Никнейм')}
                  error={errors.nickname?.message}
                  isError={!!errors.nickname?.message}
                  {...field}
                />
              )}
              control={control}
            />
          )}

          <div className={cls.inputWrapper}>
            <Controller
              name="password"
              rules={{
                required: VALIDATION_MESSAGES.REQUIRED,
                minLength: {
                  value: 6,
                  message: `${VALIDATION_MESSAGES.MIN_LENGTH} 6`,
                },
              }}
              render={({ field }) => (
                <AuthInput
                  className={cls.inputPassword}
                  placeholder={t('Пароль')}
                  type="password"
                  error={errors.password?.message}
                  isError={!!errors.password?.message}
                  autoComplete={type.isAuthActive ? 'current-password' : 'new-password'}
                  {...field}
                  ref={inputPasswordRef}
                />
              )}
              control={control}
            />
            <Eye
              className={classNames(cls.btnEye, { [cls.btnEyeActive]: isPasswordVisible })}
              onClick={togglePasswordVisible}
            />
            {/* {type.isAuthActive && ( */}
            {/* <span */}
            {/*  className={ */}
            {/*      classNames( */}
            {/*        cls.forgotPasswordSpan, */}
            {/*        { [cls.forgotPasswordSpanInvisible]: type.isRegActive }, */}
            {/*      ) */}
            {/*    } */}
            {/* > */}
            {/*  {t('Забыли пароль? ')} */}
            {/*  <Link className={classNames(cls.recoverPasswordLink)} to="/"> */}
            {/*    {t('Восстановить')} */}
            {/*  </Link> */}
            {/* </span> */}
            {/* )} */}
          </div>
        </fieldset>
      </div>

      <div className={cls.submitWrapper}>
        <button
          type="submit"
          disabled={isLoading || !isValid}
          className={classNames(cls.submitBtn)}
        >
          {renderTextInButton()}
        </button>
        <span className={cls.errorMessage}>
          {error}
        </span>
      </div>

      {/* <div className={cls.altLogin}> */}
      {/*   <span className={cls.altLoginSpan}>{t('Или можете войти с помощью LestaID:')}</span> */}
      {/*   <LestaLogo className={cls.lestaLogoIcon} onClick={() => navigate(RoutePath.authLesta)} /> */}
      {/* </div> */}
      <div className={cls.altLogin}>
        <Button
          className={cls.arrowBack}
          theme="clear"
          type="button"
          variant="down-arrow"
          onClick={() => setIsBlitzAuth(false)}
        >
          <span className={cls.altLoginSpan}>{t('Назад')}</span>
        </Button>
      </div>
    </form>
  );
});
