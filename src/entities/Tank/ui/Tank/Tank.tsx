import { ReactElement, memo, useMemo } from 'react';
import { getLevelRoman } from 'entities/Tank/lib/converterTank';
import { classNames } from 'shared/lib/classNames/classNames';
import { TUserTanks } from 'entities/Lesta/model/types/tanks';
import cls from './Tank.module.scss';
import {
  masteryTank,
  nationFlag,
  typeIcon,
  statList,
} from '../../config/TankData';
import { TankStat } from '../TankStat/TankStat';

interface TankProps {
  data?: TUserTanks;
}

export const Tank = memo(({ data }: TankProps) => {
  const mastery: Record<number, ReactElement> = useMemo(() => masteryTank, []);
  const typeTank: Record<string, ReactElement> = useMemo(() => typeIcon, []);
  const nationTank: Record<string, ReactElement> = useMemo(
    () => nationFlag,
    [],
  );
  const { tank_id, tankData, statistics } = data;

  const { mark_of_mastery } = statistics;

  const {
    name, nation, tier, type, image_preview, is_collectible, is_premium,
  } = tankData;

  const modTitle = {
    [cls.premium]: is_premium,
    [cls.collectible]: is_collectible,
  };

  return (
    <li className={cls.card}>
      <div className={cls.infoWrapper}>
        <div className={cls.titleWrapper}>
          <h3 className={classNames(cls.title, modTitle)}>{name}</h3>
          <span className={cls.flag}>{nationTank[nation]}</span>
        </div>

        <dl className={cls.statList}>
          {statList.map(({ nameItem, text }) => (
            <TankStat
              data={text}
              tankData={tankData}
              statistics={statistics}
              key={`${tank_id}-${nameItem}`}
            />
          ))}
        </dl>
      </div>

      <div className={cls.imageWrapper}>
        <img
          className={cls.tankImg}
          src={`${image_preview}`}
          alt={name}
          loading="lazy"
        />
        <div className={cls.inner}>
          <p className={cls.tier}>{getLevelRoman(tier)}</p>
          <span className={cls.type}>{typeTank[type]}</span>
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
