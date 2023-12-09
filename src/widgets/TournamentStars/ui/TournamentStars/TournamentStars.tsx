import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { dataList } from 'widgets/TournamentStars/config/TournamentStarsData';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TournamentStars.module.scss';

interface TournamentStarsProps {
  className?: string;
}

export const TournamentStars: FC<TournamentStarsProps> = ({ className }) => {
  const { t } = useTranslation('main');
  return (
    <section className={classNames(cls.tournamentStars, {}, [className])}>
      <h2 className={cls.title}>{t('Звёзды RoyalCup')}</h2>
      <p className={cls.text}>
        {t('Задача организации, в особенности же новая модель организационной деятельности'
          + ' позволяет оценить значение позиций, '
          + 'занимаемых участниками в отношении поставленных задач.')}
      </p>
      <ul className={cls.table}>
        {dataList.map(({
          id,
          icon,
          team,
          rating,
          tournaments,
          modes,
          members,
          awards,
        }) => (
          <li className={cls.tableRow} key={id}>
            <Link to="/" className={cls.link}>
              <img className={cls.icon} src={icon} alt={team} />
              <p className={cls.nameTeam}>{team}</p>
            </Link>
            <ul className={cls.list}>
              <li className={cls.item} key={team}>
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
                <p className={cls.columnValue}>{`${members}/15`}</p>
              </li>
              <li className={cls.item}>
                <span className={cls.visuallyHidden}>{t('Награды')}</span>
                {awards.map((data) => (
                  <img className={cls.awardIcon} src={data.image} alt="" key={data.id} />
                ))}
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};
