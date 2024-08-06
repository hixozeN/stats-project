import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './SessionWidgetAuthInfo.module.scss';

interface SessionWidgetAuthInfoProps {
  className?: string;
}

export const SessionWidgetAuthInfo = memo((props: SessionWidgetAuthInfoProps) => {
  const { className } = props;
  const { t } = useTranslation('widgets');

  return (
    <div className={classNames(cls.wrapper, {}, [className])}>
      <section className={cls.section}>
        <h2 className={cls.title}>{t('WIDGETS_TITLE')}</h2>
        <p className={cls.paragraph}>
          {t('WIDGETS_WELCOME_MSG')}
        </p>
        <p className={cls.paragraph}>
          {t('FIRST_PART_OF_INFO')}
        </p>
        <Link className={cls.link} to={RoutePath.auth}>{t('AUTH_LINK')}</Link>
      </section>
      <section className={classNames(cls.cards, {}, [cls.cards])}>
        <h3 className={cls.title}>{t('WHY_AUTH_NEED')}</h3>
        <ul className={cls.list}>
          <li className={cls.item}>
            <h4 className={cls.cardTitle}>{t('CARD_TITLE_1')}</h4>
            <p className={cls.cardDescription}>
              {t('CARD_DESC_1')}
            </p>
          </li>
          <li className={cls.item}>
            <h4 className={cls.cardTitle}>{t('CARD_TITLE_2')}</h4>
            <p className={cls.cardDescription}>
              {t('CARD_DESC_2')}
            </p>
          </li>
          <li className={cls.item}>
            <h4 className={cls.cardTitle}>{t('CARD_TITLE_3')}</h4>
            <p className={cls.cardDescription}>
              {t('CARD_DESC_3')}
            </p>
          </li>
          <li className={cls.item}>
            <h4 className={cls.cardTitle}>{t('CARD_TITLE_4')}</h4>
            <p className={cls.cardDescription}>
              {t('CARD_DESC_4')}
            </p>
          </li>
          <li className={cls.item}>
            <h4 className={cls.cardTitle}>{t('CARD_TITLE_5')}</h4>
            <p className={cls.cardDescription}>
              {t('CARD_DESC_5')}
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
});
