import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { ILeaderboardItem } from '../../model/types/ILeaderboardItem';
import { LeaderboardItem } from '../LeaderboardItem/LeaderboardItem';
import cls from './Leaderboard.module.scss';

interface LeaderboardProps {
  className?: string;
  data: ILeaderboardItem[];
  isLoading: boolean;
}

export const Leaderboard = memo((props: LeaderboardProps) => {
  const { className, data, isLoading } = props;

  if (isLoading) {
    return (
      <ul className={classNames(cls.table, {}, [className])}>
        {[...new Array(10)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Skeleton className={cls.skeleton} borderRadius="5px" key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className={classNames(cls.table, {}, [className])}>
      {data?.map((player, i) => (
        <LeaderboardItem key={player.account_id} player={player} index={i} />
      ))}
    </ul>
  );
});
