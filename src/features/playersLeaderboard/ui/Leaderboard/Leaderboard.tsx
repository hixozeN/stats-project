import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { DEVICE, useDevice } from 'shared/hooks/useDevice';
import { LeaderboardItemMobile } from '../LeaderboardItemMobile';
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

  const isTablet = useDevice(DEVICE.TABLET);

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

  if (isTablet) {
    return (
      <ul className={classNames(cls.table, {}, [className])}>
        {data?.map((player, i) => (
          <LeaderboardItemMobile key={player.account_id} player={player} index={i} />
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
