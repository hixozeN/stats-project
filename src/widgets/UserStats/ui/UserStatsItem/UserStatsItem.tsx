import {
  memo, SVGProps, useCallback, VoidFunctionComponent,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './UserStatsItem.module.scss';

interface IUserStatsItemProps {
  className?: string;
  Icon?: VoidFunctionComponent<SVGProps<SVGSVGElement>>;
  itemName?: string;
  counter?: number | string;
  delta?: number | string;
  isLoading?: boolean;
}

export const UserStatsItem = memo((props: IUserStatsItemProps) => {
  const {
    className, Icon, counter, itemName, delta = 0, isLoading,
  } = props;
  const { t } = useTranslation('userPage');

  const isPositive = delta > 0 && itemName !== 'Поражения';
  const isNegative = delta < 0 || itemName === 'Поражения';

  const calculateDelta = useCallback((diff: number | string, label: string) => {
    if (diff === 0) return '';

    if (diff > 0) return `+${delta}${label === 'Винрейт' ? '%' : ''}`;

    return `${delta}${label === 'Винрейт' ? '%' : ''}`;
  }, [delta]);

  const renderCounter = useCallback(() => {
    if (itemName === 'Рейтинг' && counter === 3000) return t('RATING_CALIBRATION');
    return counter;
  }, [counter, itemName, t]);

  if (isLoading) {
    return (
      <li className={classNames(cls.statItem, {}, [className, cls.skeleton])} />
    );
  }

  return (
    <li className={classNames(cls.statItem, {}, [className])}>
      <Icon className={cls.icon} />
      <div className={cls.dataWrapper}>
        <span className={classNames(cls.delta, { [cls.positive]: isPositive, [cls.negative]: isNegative }, [])}>
          {`${calculateDelta(delta, itemName)}`}
        </span>
        <h3 className={classNames(cls.counter, { [cls.counterSession]: itemName === 'Старт сессии' }, [])}>
          {renderCounter()}
        </h3>
        <p className={cls.name}>{t(itemName)}</p>
      </div>
    </li>
  );
});
