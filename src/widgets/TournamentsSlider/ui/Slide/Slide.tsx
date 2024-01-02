import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { TournamentData } from 'entities/Tournament';
import { TeamList } from '../TeamList/TeamList';
import cls from './Slide.module.scss';
import { timeConverter } from '../../lib/timeConverter';

interface ISlideProps {
  tournamentData: TournamentData;
}

export const Slide = memo((props: ISlideProps) => {
  const {
    tournamentData,
  } = props;

  return (
    <li className={classNames(cls.slideItem)}>
      <div className={cls.imageWrapper}>
        <img
          className={cls.image}
          src={tournamentData.image}
          alt={tournamentData.image}
        />
      </div>
      <div className={cls.tournamentInfo}>
        <div className={cls.tournamentHeading}>
          <h2 className={cls.tournamentName}>{tournamentData.name}</h2>
          <p className={cls.prize}>
            {`Призовой фонд: ${tournamentData.prize.amount} ${tournamentData.prize.currency}`}
          </p>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <p className={cls.duration}>
            {`${timeConverter(tournamentData.date_start)} - ${timeConverter(tournamentData.date_end)}`}
          </p>
        </div>
        <TeamList />
      </div>
    </li>
  );
});
