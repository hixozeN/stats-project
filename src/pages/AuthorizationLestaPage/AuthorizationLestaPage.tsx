import Loader from 'shared/ui/Loader/Loader';
import { useEffect } from 'react';
import { openIDURL } from 'shared/consts/openID';
import cls from './AuthorizationLestaPage.module.scss';

export const AuthorizationLestaPage = () => {
  useEffect(() => {
    window.location.replace(openIDURL);
  }, []);

  return (
    <div className={cls.wrapper}>
      <span className={cls.label}>{t('authPageLoaderLesta')}</span>
      <Loader className={cls.loader} />
    </div>
  );
};
