import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import { Background } from 'shared/ui/Background/Background';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { useLocation, useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';
import { ScrollToTop } from 'shared/lib/ScrollToTop/ScrollToTop';
import cls from './WN8Page.module.scss';

// @TODO: сделать нормальные хлебные крошки :D
const WN8Page = () => {
  const { t } = useTranslation('wn8');

  const navigate = useNavigate();
  const location = useLocation();

  const navigateBack = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate('/');
    }
  };

  return (
    <ErrorBoundary>
      <SeoUpdater
        title={t('seo.title')}
        description={t('seo.description')}
      />
      <Background />
      <ScrollToTop />
      <div className={cls.wn8Page}>
        <article>
          <div className={cls.breadcrumbs}>
            <AppLink to=".." onClick={navigateBack} className={cls.breadcrumbsLink}>{location.state?.from ? t('breadcrumbs.back') : t('breadcrumbs.home')}</AppLink>
            <span className={cls.breadcrumbsSeparator}>/</span>
            <span>{t('title')}</span>
          </div>
          <h1 className={cls.title}>{t('title')}</h1>
          <p className={cls.paragraph}>
            <span className={cls.bold}>{t('spanBold')}</span>
            {' '}
            {t('p1')}
          </p>
          <p className={cls.paragraph}>{t('p2')}</p>
          <p className={cls.paragraph}>
            {t('p3')}
          </p>
          <p className={cls.paragraph}>{t('p4')}</p>
          <p className={cls.paragraph}>
            {t('p5')}
          </p>
          <div>
            <h2 className={cls.subtitle}>{t('subtitle1')}</h2>
            <ul className={cls.wn8GradeList}>
              <li className={classNames(cls.wn8GradeItem, {}, [cls.veryBadWN8])}>
                <span>450-650</span>
                <span className={cls.spanSecondaryDark}>{t('veryBadWN8')}</span>
              </li>
              <li className={classNames(cls.wn8GradeItem, {}, [cls.badWN8])}>
                <span>650-900</span>
                <span className={cls.spanSecondary}>{t('badWN8')}</span>
              </li>
              <li className={classNames(cls.wn8GradeItem, {}, [cls.belowAverageWN8])}>
                <span>900-1200</span>
                <span className={cls.spanSecondaryDark}>{t('belowAverageWN8')}</span>
              </li>
              <li className={classNames(cls.wn8GradeItem, {}, [cls.averageWN8])}>
                <span>1200-1600</span>
                <span className={cls.spanSecondaryDark}>{t('averageWN8')}</span>
              </li>
              <li className={classNames(cls.wn8GradeItem, {}, [cls.goodWN8])}>
                <span>1600-2000</span>
                <span className={cls.spanSecondary}>{t('aboveAverageWN8')}</span>
              </li>
              <li className={classNames(cls.wn8GradeItem, {}, [cls.veryGoodWN8])}>
                <span>2000-2450</span>
                <span className={cls.spanSecondary}>{t('goodWN8')}</span>
              </li>
              <li className={classNames(cls.wn8GradeItem, {}, [cls.greatWN8])}>
                <span>2450-2900</span>
                <span className={cls.spanSecondary}>{t('veryGoodWN8')}</span>
              </li>
              <li className={classNames(cls.wn8GradeItem, {}, [cls.superUnicumWN8])}>
                <span>2900+</span>
                <span className={cls.spanSecondary}>{t('unicumWN8')}</span>
              </li>
              <p>{t('otherGrades')}</p>
              <li className={classNames(cls.wn8GradeItem, {}, [cls.superUnicumWN8])}>
                <span>3500+</span>
                <span className={cls.spanSecondary}>{t('superUnicumWN8')}</span>
              </li>
              <li className={classNames(cls.wn8GradeItem, {}, [cls.superUnicumWN8])}>
                <span>4000+</span>
                <span className={cls.spanSecondary}>{t('cyberWN8')}</span>
              </li>
              <li className={classNames(cls.wn8GradeItem, {}, [cls.superUnicumWN8])}>
                <span>4500+</span>
                <span className={cls.spanSecondary}>{t('legendWN8')}</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className={cls.subtitle}>{t('subtitle2')}</h2>
            <p className={cls.paragraph}>{t('p6')}</p>
            <p className={cls.paragraph}>
              {t('p7')}
            </p>
          </div>
        </article>
      </div>
    </ErrorBoundary>
  );
};

export default WN8Page;
