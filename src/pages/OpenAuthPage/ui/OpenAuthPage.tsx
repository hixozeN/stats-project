import { classNames } from 'shared/lib/classNames/classNames';
import { ErrorBoundary } from 'app/providers/ErrorBoundary/index';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import { useTranslation } from 'react-i18next';
import { Background } from 'shared/ui/Background/Background';
import { Logo } from 'shared/ui/Logo/Logo';
import { ConnectOpenId } from 'features/ConnectOpenId';
import cls from './OpenAuthPage.module.scss';

interface OpenAuthPageProps {
  className?: string;
}

const OpenAuthPage = (props: OpenAuthPageProps) => {
  const { className } = props;
  const { t } = useTranslation('openID');

  return (
    <ErrorBoundary>
      <Background />
      <SeoUpdater title={t('title')} />
      <div className={classNames(cls.OpenAuthPage, {}, [className])}>
        <div className={cls.wrapper}>
          <section className={cls.openId}>
            <div className={cls.headingWrapper}>
              <h2 className={cls.heading}>{t('title')}</h2>
              <Logo theme="header" />
            </div>
            <ConnectOpenId />
          </section>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default OpenAuthPage;
