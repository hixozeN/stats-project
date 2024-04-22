import { useTranslation } from 'react-i18next';
import { TournamentStars } from 'widgets/TournamentStars';
import { Footer } from 'widgets/Footer';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import cls from './MainPage.module.scss';

function MainPage() {
  const { t } = useTranslation('main');

  return (
    <ErrorBoundary>
      <SeoUpdater
        title={t('PAGE_TITLE')}
      />
      <section className={cls.promo}>
        <div className={cls.background}>
          <h1 className={cls.title}>{t('PROMO_HEADING')}</h1>
          {/* <h2 className={cls.subtitle}>{t('Как играть')}</h2> */}
          <ol className={cls.list}>
            <li className={cls.item}>
              <p className={cls.text}>{t('STEP_ONE')}</p>
            </li>
            <li className={cls.item}>
              <p className={cls.text}>{t('STEP_TWO')}</p>
            </li>
            <li className={cls.item}>
              <p className={cls.text}>{t('STEP_THREE')}</p>
            </li>
            <li className={cls.item}>
              <p className={cls.text}>{t('STEP_FOUR')}</p>
            </li>
          </ol>
        </div>
      </section>
      <TournamentStars />
      <Footer />
    </ErrorBoundary>

  );
}

export default MainPage;
