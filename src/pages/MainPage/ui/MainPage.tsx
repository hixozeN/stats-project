import React from 'react';
import { useTranslation } from 'react-i18next';
import cls from './MainPage.module.scss';

function MainPage() {
  const { t } = useTranslation('main');

  return (
    <>
      <section className={cls.promo}>
        <div className={cls.background}>
          <h1 className={cls.title}>Соревновательные матчи и турниры</h1>
          <p className={cls.text}>Задача организации, в особенности же новая модель организационной деятельности позволяет оценить значение позиций, занимаемых участниками в отношении поставленных задач. </p>
        </div>
      </section>
      <section className={cls.manual}>
        <h2 className={cls.title}>Как играть</h2>
        <ol className={cls.list}>
          <li className={cls.item}>
            <div className={cls.shadow} />
            <p className={cls.text}>Регистрируй аккаунт</p>
          </li>
          <li className={cls.item}>
            <div className={cls.shadow} />
            <p>Создавай или вступай в команду</p>
          </li>
          <li className={cls.item}>
            <div className={cls.shadow} />
            <p>Регистрируйся в турнире</p>
          </li>
          <li className={cls.item}>
            <div className={cls.shadow} />
            <p>Играй и побеждай</p>
          </li>
        </ol>
      </section>
    </>

  );
}

export default MainPage;
