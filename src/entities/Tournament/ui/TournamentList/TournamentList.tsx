import {
  memo,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { TournamentData } from '../../model/types/tournament';
import { getTournaments } from '../../model/selectors/getTournaments';
import { getLadders } from '../../model/selectors/getLadders';
import { getFinishedTournaments } from '../../model/selectors/getFinishedTournaments';
import cls from './TournamentList.module.scss';
import { TournamentCard } from '../TournamentCard/TournamentCard';

interface ILadderListProps {
  className?: string;
  activeTab: number;
}

export const TournamentList = memo((props: ILadderListProps) => {
  const { className, activeTab } = props;

  const tournaments = useSelector(getTournaments);
  const ladders = useSelector(getLadders);
  const finishedTournaments = useSelector(getFinishedTournaments);

  const renderContent = () => {
    if (activeTab === 0) {
      if (ladders.length > 0) {
        return ladders.map((item: TournamentData) => <TournamentCard key={item._id} data={item} />);
      }
      return 'Текущих ладдеров пока что нет...';
    }

    if (activeTab === 1) {
      if (tournaments.length > 0) {
        return tournaments.map((item: TournamentData) => <TournamentCard key={item._id} data={item} />);
      }
      return 'Текущих турниров пока что нет...';
    }

    if (finishedTournaments.length > 0) {
      return finishedTournaments.map((item: TournamentData) => <TournamentCard key={item._id} data={item} />);
    }

    return 'Пока еще не сыграно ни одного турнира.';
  };

  return (
    <ul className={classNames(cls.TournamentList, {}, [className])}>
      {renderContent()}
    </ul>
  );
});
