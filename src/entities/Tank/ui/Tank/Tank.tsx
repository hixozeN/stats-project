import { LestaTankStats } from 'entities/Lesta';
import { ReactElement, memo, useMemo } from 'react';
import { getLevelRoman } from 'entities/Tank/lib/converterTank';
import cls from './Tank.module.scss';
import {
  masteryTank, nationFlag, type, statList,
} from '../../config/TankData';
import { TankStat } from '../TankStat/TankStat';

interface TankProps {
  data?: LestaTankStats;
}

export const Tank = memo(({ data }: TankProps) => {
  const mastery: Record<number, ReactElement> = useMemo(() => masteryTank, []);
  const typeTank: Record<string, ReactElement> = useMemo(() => type, []);
  const nationTank: Record<string, ReactElement> = useMemo(
    () => nationFlag,
    [],
  );
  const {
    tankData, last_battle_time, mark_of_mastery, statistics,
  } = data;

  return (
    <li className={cls.card}>
      <div className={cls.infoWrapper}>
        <div className={cls.titleWrapper}>
          <h3 className={cls.title}>{tankData.name}</h3>
          <span className={cls.flag}>{nationTank[tankData.nation]}</span>
        </div>
        <dl className={cls.statList}>
          {statList.map((item: string) => (
            <TankStat
              lasteDateGame={last_battle_time}
              data={item}
              statistics={statistics}
            />
          ))}
        </dl>
      </div>
      <div className={cls.imageWrapper}>
        <img
          className={cls.tankImg}
          src={`${tankData.image_preview}`}
          alt={tankData.name}
        />
        <div className={cls.inner}>
          <p className={cls.tier}>{getLevelRoman(tankData.tier)}</p>
          <span className={cls.type}>{typeTank[tankData.type]}</span>
        </div>
        {mark_of_mastery !== 0 && (
        <img
          className={cls.mastery}
          src={`${mastery[mark_of_mastery]}`}
          alt={`${mark_of_mastery}`}
        />
        )}
      </div>
    </li>
  );
});
