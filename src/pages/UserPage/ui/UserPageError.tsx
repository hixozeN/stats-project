import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import { Background } from 'shared/ui/Background/Background';
import { Button } from 'shared/ui/Button/Button';
import { ErrorBoundary } from 'app/providers/ErrorBoundary/index';
import { useTranslation } from 'react-i18next';
import cls from './UserPage.module.scss';

interface UserPageErrorProps {
  error: string;
  onFetchUserData?: () => void;
  className?: string;
}

export const UserPageError = memo((props: UserPageErrorProps) => {
  const { error, onFetchUserData, className } = props;
  const { t } = useTranslation('userPage');

  return (
    <ErrorBoundary>
      <SeoUpdater
        title={t('PAGE_TITLE')}
      />
      <Background />
      <div className={classNames(cls.UserPage, {}, [className])}>
        <section
          className={classNames(cls.wrapper, {}, [cls.notFoundSection])}
        >
          <h2 className={cls.notFoundSectionHeading}>
            {t('FETCH_DATA_ERROR_MESSAGE')}
          </h2>
          <span className={cls.errorMessage}>{error}</span>
          <span className={cls.retryMessage}>{t('RETRY_MESSAGE')}</span>
          <Button onClick={onFetchUserData}>{t('REFRESH')}</Button>
        </section>
      </div>
    </ErrorBoundary>
  );
});
