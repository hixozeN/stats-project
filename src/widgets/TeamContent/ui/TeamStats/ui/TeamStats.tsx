import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  getClanMembersCount,
  getClanStatistics,
} from 'entities/Lesta';
import { statsData } from '../config/statsData';
import { TeamStatsItem } from '../../TeamStatsItem';
import cls from './TeamStats.module.scss';

interface TeamStatsProps {
  className?: string;
}

interface IStatsData {
  icon: ReactElement;
  title: string;
  result: number | string;
}

export const TeamStats = (props: TeamStatsProps) => {
  const { className } = props;
  const clanStats = useSelector(getClanStatistics);
  const clanMembersCount = useSelector(getClanMembersCount);

  const data: IStatsData[] = statsData(
    clanStats?.battles,
    clanStats?.winRate,
    clanStats?.avgDamage,
    clanStats?.avgRating,
    clanStats?.wn8,
    clanMembersCount,
  );

  if (!clanStats) return null;

  return (
    <section className={classNames('', {}, [className])}>
      <ul className={cls.list}>
        {data.map(({ icon, title, result }) => (
          <TeamStatsItem key={title} icon={icon} title={title} result={result} />
        ))}
      </ul>
    </section>
  );
};
