import { LestaTankStats } from 'entities/Lesta';
import { ReactElement, memo, useMemo } from 'react';
import { getLevelRoman } from 'entities/Tank/lib/converterTank';
import { classNames } from 'shared/lib/classNames/classNames';
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
    tank_id,
    tankData,
    last_battle_time,
    mark_of_mastery,
    statistics,
    wn8,
    battlesToShowWN8,
  } = data;

  const modTitle = { [cls.premium]: tankData.is_premium, [cls.collectible]: tankData.is_collectible };

  return (
    <li className={cls.card}>
      <div className={cls.infoWrapper}>
        <div className={cls.titleWrapper}>
          <h3
            className={classNames(cls.title, modTitle)}
          >
            {tankData.name}
          </h3>
          <span className={cls.flag}>{nationTank[tankData.nation]}</span>
        </div>

        <dl className={cls.statList}>
          {statList.map((item: string) => (
            <TankStat
              lasteDateGame={last_battle_time}
              battlesToShowWN8={battlesToShowWN8}
              data={item}
              tankData={tankData}
              statistics={statistics}
              wn8={wn8}
              key={`${tank_id}-${item}`}
            />
          ))}
        </dl>
      </div>

      <div className={cls.imageWrapper}>
        <img
          className={cls.tankImg}
          src={`${tankData.image_preview}`}
          alt={tankData.name}
          loading="lazy"
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
            loading="lazy"
          />
        )}
      </div>
    </li>
  );
});
