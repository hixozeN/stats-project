import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { formatter } from 'entities/Tank/lib/converterTank';
import { classNames } from 'shared/lib/classNames/classNames';
import { ToolTip } from 'shared/ui/ToolTip/ToolTip';
import { LestaTankData } from 'entities/Lesta/model/types/tanks';
import { ParamData } from 'entities/Lesta/model/types/default';
import cls from './TankStat.module.scss';

interface TankStatProps {
  data: string;
  statistics: ParamData;
  tankData: LestaTankData;
}

export const TankStat = memo(
  ({ data, statistics, tankData }: TankStatProps) => {
    const {
      battles, winRate, avgDamage, wn8, last_battle_time,
    } = statistics;
    const { tier } = tankData;
    const { t } = useTranslation('tank');

    const lasteDate = last_battle_time
      ? formatter(last_battle_time)
      : 'никогда';
    const WN8 = () => {
      if (tier >= 6) {
        if (battles > 0 && wn8 === 0) {
          return 'калибровка';
        }
        return Math.round(wn8);
      }
      return 'нет';
    };

    const isNice = winRate >= 50;
    const isGood = winRate < 70 && winRate >= 60;
    const isGreat = winRate >= 70;
    const isVisible = data === 'WN8'
      && (battles < 100 || (tier < 6 && wn8 === 0));

    const isVeryBadWN8 = wn8 < 300;
    const isBadWN8 = wn8 >= 300 && wn8 < 450;
    const isBelowAverageWN8 = wn8 >= 450 && wn8 < 650;
    const isAverageWN8 = wn8 >= 650 && wn8 < 900;
    const isAboveAverageWN8 = wn8 >= 900 && wn8 < 1200;
    const isGroodWN8 = wn8 >= 1200 && wn8 < 1600;
    const isVeryGroodWN8 = wn8 >= 1600 && wn8 < 2000;
    const isGreatWN8 = wn8 >= 2000 && wn8 < 2450;
    const isUnicum = wn8 >= 2450 && wn8 < 2900;
    const isSuperUnicum = wn8 >= 2900;

    const classNameRate = () => {
      if (data === 'Побед') {
        return {
          [cls.nice]: isNice,
          [cls.good]: isGood,
          [cls.great]: isGreat,
        };
      }
      if (data === 'WN8') {
        return {
          [cls.veryBadWN8]: isVeryBadWN8,
          [cls.badWN8]: isBadWN8,
          [cls.belowAverageWN8]: isBelowAverageWN8,
          [cls.averageWN8]: isAverageWN8,
          [cls.aboveAverageWN8]: isAboveAverageWN8,
          [cls.goodWN8]: isGroodWN8,
          [cls.veryGoodWN8]: isVeryGroodWN8,
          [cls.greatWN8]: isGreatWN8,
          [cls.unicumWN8]: isUnicum,
          [cls.superUnicumWN8]: isSuperUnicum,
          [cls.visible]: isVisible,
        };
      }
      return {};
    };

    const textTollTip = () => {
      if (tier < 6) {
        return 'Для такна ниже VI уровня расчет не ведется';
      }
      if (wn8 === 0 && battles >= 0) {
        return `Осталось боёв: ${100 - battles}`;
      }
      return null;
    };

    const statParams: Record<string, string | number> = {
      Боёв: battles,
      Побед: `${winRate.toFixed(2)}%`,
      // Побед: `${winRate.toFixed(2).replace(/\./g, ',')}%`,
      'Ср. урон': avgDamage,
      WN8: WN8(),
      'Последний бой': lasteDate,
    };

    return (
      <div className={cls.wrapper}>
        <dt className={cls.term}>{`${t(`${data}`)}:`}</dt>
        <dd className={classNames(cls.definition, classNameRate())}>
          {statParams[`${data}`]}
          <ToolTip text={textTollTip()} isVisible={isVisible} />
        </dd>
      </div>
    );
  },
);
