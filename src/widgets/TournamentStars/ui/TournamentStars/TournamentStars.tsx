import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { dataList } from '../../config/TournamentStarsData';
import cls from './TournamentStars.module.scss';

interface TournamentStarsProps {
  className?: string;
}

export const TournamentStars: FC<TournamentStarsProps> = ({ className }) => {
  const { t } = useTranslation('main');

  return (
    <section className={cls.tournamentStars}>
      <h2 className={cls.title}>{t('Звёзды RoyalCup')}</h2>
      <p className={cls.text}>
        {t('Задача организации, в особенности же новая модель организационной деятельности'
          + ' позволяет оценить значение позиций, '
          + 'занимаемых участниками в отношении поставленных задач.')}
      </p>
      <ul className={cls.table}>
        {dataList.map(({
          icon,
          team,
          rating,
          tournaments,
          modes,
          participants,
          awards,
        }) => (
          <li className={cls.tableRow}>
            <NavLink to="#" className={cls.link}>
              <img className={cls.icon} src={icon} alt={team} />
              <p className={cls.nameTeam}>{team}</p>
            </NavLink>
            <ul className={cls.list}>
              <li className={cls.item}>
                <span className={cls.columnName}>{t('Рейтинг')}</span>
                <p className={cls.columnValue}>{rating}</p>
              </li>
              <li className={cls.item}>
                <span className={cls.columnName}>{t('Турниров')}</span>
                <p className={cls.columnValue}>{tournaments}</p>
              </li>
              <li className={cls.item}>
                <span className={cls.columnName}>{t('Режимы')}</span>
                <p className={cls.columnValue}>{modes}</p>
              </li>
              <li className={cls.item}>
                <span className={cls.columnName}>{t('Участников')}</span>
                <p className={cls.columnValue}>{`${participants}/15`}</p>
              </li>
            </ul>
            <ul className={cls.listIcon}>
              <span className={cls.visuallyHidden}>{t('Награды')}</span>
              {awards.map((award) => (
                <li className={cls.itemIcon}>
                  <img className={cls.awardIcon} src={award} alt="" />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};
