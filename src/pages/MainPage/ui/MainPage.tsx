import React from 'react';
import { useTranslation } from 'react-i18next';
import { TournamentStars } from 'widgets/TournamentStars/index';
import cls from './MainPage.module.scss';

function MainPage() {
  const { t } = useTranslation('main');

  return (
    <>
      <section className={cls.promo}>
        <div className={cls.background}>
          <h1 className={cls.title}>{t('Соревновательные матчи и турниры')}</h1>
          <h2 className={cls.subtitle}>{t('Как играть')}</h2>
          <ol className={cls.list}>
            <li className={cls.item}>
              <p className={cls.text}>{t('Регистрируй аккаунт')}</p>
            </li>
            <li className={cls.item}>
              <p className={cls.text}>{t('Создавай или вступай в команду')}</p>
            </li>
            <li className={cls.item}>
              <p className={cls.text}>{t('Регистрируйся в турнире')}</p>
            </li>
            <li className={cls.item}>
              <p className={cls.text}>{t('Играй и побеждай')}</p>
            </li>
          </ol>
        </div>
      </section>
      <TournamentStars />
    </>

  );
}

export default MainPage;
