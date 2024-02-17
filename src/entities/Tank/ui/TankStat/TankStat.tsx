import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { LestaUserStatistics } from 'shared/api';
import {
  getAvgDamage,
  getWinRate,
} from 'widgets/UserStats/lib/generateStatsList';
import { formatter } from 'entities/Tank/lib/converterTank';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TankStat.module.scss';

interface TankStatProps {
  data: string;
  statistics: LestaUserStatistics;
  lasteDateGame: number;
}

export const TankStat = memo(
  ({ data, statistics, lasteDateGame }: TankStatProps) => {
    const { battles, wins, damage_dealt } = statistics;
    const { t } = useTranslation('tank');
    const winRate = getWinRate(wins, battles);
    const avgDamage = getAvgDamage(damage_dealt, battles);
    const lasteDate = formatter(lasteDateGame);
    const WN8 = 0;

    const isNice = winRate >= 50;
    const isGood = winRate < 70 && winRate >= 60;
    const isGreat = winRate >= 70;

    const classNameRate = data === 'Побед' && {
      [cls.nice]: isNice,
      [cls.good]: isGood,
      [cls.great]: isGreat,
    };

    const statParams: Record<string, string | number> = {
      Боёв: battles,
      Побед: `${winRate.toFixed(2).replace(/\./g, ',')}%`,
      'Ср. урон': avgDamage,
      WN8,
      'Последний бой': lasteDate,
    };

    return (
      <div className={cls.wrapper}>
        <dt className={cls.term}>{`${t(`${data}`)}:`}</dt>
        <dd className={classNames(cls.definition, classNameRate)}>
          {statParams[`${data}`]}
        </dd>
      </div>
    );
  },
);
