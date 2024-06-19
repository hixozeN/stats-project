import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DeltaIndicator.module.scss';

interface DeltaIndicatorProps {
  delta: number | string;
  itemName: string;
}

export const DeltaIndicator: FC<DeltaIndicatorProps> = memo((
  {
    delta,
    itemName,
  }: DeltaIndicatorProps,
) => {
  const calculateDelta = (diff: number | string, label: string): string => {
    const numDiff = Number(diff);

    if (numDiff === 0 || Number.isNaN(numDiff)) return '';

    const sign = diff > 0 ? '+' : '';
    const postfix = label === 'Винрейт' ? '%' : '';
    return `${sign}${diff}${postfix}`;
  };

  const isPositive: boolean = delta > 0 && itemName !== 'Поражения';
  const isNegative: boolean = delta < 0 || itemName === 'Поражения';

  return (
    <span
      className={classNames(cls.delta, {
        [cls.positive]: isPositive,
        [cls.negative]: isNegative,
      })}
      data-testid="deltaIndicator"
    >
      {calculateDelta(delta, itemName)}
    </span>
  );
});
