/*
  eslint-disable camelcase
*/
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import PeopleIcon from 'shared/assets/icons/tournaments/people.svg';
import RatingIcon from 'shared/assets/icons/tournaments/rating.svg';
import { Button } from 'shared/ui/Button/Button';
import { TournamentData } from 'entities/Tournament/index';
import { useTranslation } from 'react-i18next';
import cls from './TournamentCard.module.scss';

interface ITournamentCardProps {
  className?: string;
  data: TournamentData;
}

export const TournamentCard = memo(({ className, data }: ITournamentCardProps) => {
  const { t } = useTranslation();
  const {
    name, image, participants, max_teams, min_rating,
  } = data;

  return (
    <li className={classNames(cls.TournamentCard, {}, [className])}>
      <Button variant="join">{t('Подать заявку')}</Button>
      <div className={cls.imageWrapper}>
        <img className={cls.image} src={image} alt={name} />
      </div>
      <div className={cls.cardInfoWrapper}>
        <div className={cls.cardHeading}>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <p className={cls.date}>23 Окт - Начало в 14:00</p>
          <h3 className={cls.name}>{name}</h3>
        </div>
        <ul className={cls.requirements}>
          <li className={cls.requirement}>
            <PeopleIcon />
            {`${participants.length}/${max_teams}`}
          </li>
          <li className={cls.requirement}>
            <RatingIcon />
            {min_rating}
            +
          </li>
        </ul>
      </div>
    </li>
  );
});
