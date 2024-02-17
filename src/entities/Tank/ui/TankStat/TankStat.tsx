import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { LestaUserStatistics } from 'shared/api';
import {
  getAvgDamage,
  getWinRate,
} from 'widgets/UserStats/lib/generateStatsList';
import { formatter } from 'entities/Tank/lib/converterTank';
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

    //     до 50% - белый цвет
    // до 60% - зеленый
    // до 70% - лазурный
    // 70%+ фиолетовый

    const statParams: Record<string, string | number> = {
      Боёв: battles,
      Побед: `${winRate}%`,
      'Ср. урон': avgDamage,
      WN8,
      'Последний бой': lasteDate,
    };

    return (
      <div className={cls.wrapper}>
        <dt className={cls.term}>{`${t(`${data}`)}:`}</dt>
        <dd className={cls.definition}>{statParams[`${data}`]}</dd>
      </div>
    );
  },
);
