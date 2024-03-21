import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TeamItemProps } from 'entities/Team';
import cls from './TournamentItem.module.scss';

export const TournamentItem = ({ dataTeam }: TeamItemProps) => {
  const {
    logo, name, rating, tournaments, modes, members, awards,
  } = dataTeam;
  const { t } = useTranslation('main');
  return (
    <li className={cls.tableRow}>
      <Link to="/" className={cls.link}>
        <img className={cls.icon} src={logo} alt={name} />
        <p className={cls.nameTeam}>{name}</p>
      </Link>
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
          <p className={cls.columnValue}>{`${members}/15`}</p>
        </li>
        <li className={cls.item}>
          <span className={cls.visuallyHidden}>{t('Награды')}</span>
          {awards.map((data) => (
            <img
              className={cls.awardIcon}
              src={data.image}
              alt=""
              key={data._id}
            />
          ))}
        </li>
      </ul>
    </li>
  );
};
