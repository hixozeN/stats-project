import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { getLestaUserClanData } from 'entities/Lesta';
import {
  avarageWinrate,
  averageNumberDamage,
  averageNumberFights,
} from 'shared/lib/statsClan/statsClan';
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
  const clanData = useSelector(getLestaUserClanData);

  const battles = averageNumberFights(clanData);
  const winrate = avarageWinrate(clanData);
  const damage = averageNumberDamage(clanData);
  const members = clanData?.members_count || 0;

  const data: IStatsData[] = statsData(battles, winrate, damage, members);

  if (!clanData) return null;

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
