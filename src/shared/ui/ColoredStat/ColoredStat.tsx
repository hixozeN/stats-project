import { memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ColoredStat.module.scss';

interface ColoredStatProps {
  value: number;
  type: 'winrate' | 'wn8';
  text?: string;
  className?: string;
}

export const ColoredStat = memo((props: ColoredStatProps) => {
  const {
    value, text, type, className,
  } = props;

  const isWinrate = type === 'winrate';
  const isWN8 = type === 'wn8';

  const mods = useMemo(() => ({
    // цвета винрейта
    [cls.nice]: value >= 50 && isWinrate,
    [cls.good]: value < 70 && value >= 60 && isWinrate,
    [cls.great]: value >= 70 && isWinrate,
    // цвета вн8
    [cls.veryBadWN8]: value < 300 && isWN8,
    [cls.badWN8]: value >= 300 && value < 450 && isWN8,
    [cls.belowAverageWN8]: value >= 450 && value < 650 && isWN8,
    [cls.averageWN8]: value >= 650 && value < 900 && isWN8,
    [cls.aboveAverageWN8]: value >= 900 && value < 1200 && isWN8,
    [cls.goodWN8]: value >= 1200 && value < 1600 && isWN8,
    [cls.veryGoodWN8]: value >= 1600 && value < 2000 && isWN8,
    [cls.greatWN8]: value >= 2000 && value < 2450 && isWN8,
    [cls.unicumWN8]: value >= 2450 && value < 2900 && isWN8,
    [cls.superUnicumWN8]: value >= 2900 && isWN8,
  }), [isWinrate, isWN8, value]);

  return (
    <span className={classNames('', mods, [className])}>{text ?? value}</span>
  );
});
