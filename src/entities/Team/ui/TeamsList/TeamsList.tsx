import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { TournamentItem } from 'widgets/TournamentStars/ui/TournamentItem/TournamentItem';
import { TeamData } from 'entities/Team/model/types/team';
import { useSelector } from 'react-redux';
import { getMyTeams } from 'entities/Team/model/selectors/getMyTeams';
import { getOpenedTeams } from 'entities/Team/model/selectors/getOpenedTeams';
import { getTopTeams } from 'entities/Team/model/selectors/getTopTeams';
import cls from './TeamsList.module.scss';

interface TeamsPageProps {
  className?: string;
  activeTab: number;
  // setItems?: (item: TeamData[]) => void;
}

export const TeamsList = memo((props: TeamsPageProps) => {
  const { className, activeTab } = props;
  const myTeams = useSelector(getMyTeams) || [];
  const openedTeams = useSelector(getOpenedTeams) || [];
  const topTeams = useSelector(getTopTeams) || [];

  const renderContent = () => {
    if (activeTab === 0) {
      if (myTeams.length > 0) {
        return myTeams.map((item: TeamData) => (
          <TournamentItem key={item._id} dataTeam={item} />
        ));
      }
      return 'У вас нет команд';
    }

    if (activeTab === 1) {
      if (openedTeams.length > 0) {
        return openedTeams.map((item: TeamData) => (
          <TournamentItem key={item._id} dataTeam={item} />
        ));
      }
      return 'Нет открытых команд';
    }

    if (topTeams.length > 0) {
      return topTeams.map((item: TeamData) => (
        <TournamentItem key={item._id} dataTeam={item} />
      ));
    }

    return 'Топ еще не сформирован';
  };

  return (
    <ul className={classNames(cls.TeamsList, {}, [className])}>
      {renderContent()}
    </ul>
  );
});
