import LestaLogo from 'shared/assets/icons/logo_lesta.svg';
import { useTranslation } from 'react-i18next';
import { Logo } from 'shared/ui/Logo/Logo';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './AuthSelect.module.scss';

interface AuthSelectProps {
  setIsBlitzAuth: (state: boolean) => void;
}

export const AuthSelect = ({ setIsBlitzAuth }: AuthSelectProps) => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  return (
    <div className={cls.wrapper}>
      <Logo theme="auth"/>
      <h1 className={cls.title}>
        {t('Выберите способ авторизации:')}
      </h1>
      <div className={cls.inner}>
        <LestaLogo className={cls.logoLesta} onClick={() => navigate(RoutePath.authLesta)}/>
        <Logo className={cls.logoBlitz} withoutCrown theme="auth" onClick={() => {
          setIsBlitzAuth(true);
        }}/>
      </div>
    </div>
  );
};
