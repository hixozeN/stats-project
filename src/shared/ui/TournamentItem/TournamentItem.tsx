import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import cls from './TournamentItem.module.scss';

interface IAwardsTeam {
  _id: number;
  image: string;
  rarity: string;
}

interface ITournamentTeam {
  _id: number;
  icon: string;
  team: string;
  rating: number;
  tournaments: number;
  modes: number;
  members: number;
  awards: IAwardsTeam[];
}

interface ITournamentItemProps {
  dataTeam: ITournamentTeam;
}

export const TournamentItem = ({ dataTeam }: ITournamentItemProps) => {
  const {
    icon, team, rating, tournaments, modes, members, awards,
  } = dataTeam;
  const { t } = useTranslation('main');
  return (
    <li className={cls.tableRow}>
      <Link to="/" className={cls.link}>
        <img className={cls.icon} src={icon} alt={team} />
        <p className={cls.nameTeam}>{team}</p>
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
