import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { IStatList } from 'entities/Tank/config/TankData';
import { sortItem } from 'features/Filter/types/sort';
import { Button } from '../../../../shared/ui/Button/Button';
import cls from './Sort.module.scss';

interface SortProps {
  data?: IStatList;
  clickSort?: (nameItem: string, paramItem: string) => void;
  state?: Record<string, sortItem>;
}

function SortItem({ data, clickSort, state }: SortProps) {
  const { t } = useTranslation('tank');
  const { nameItem: name, text, param } = data;
  const stateSort = state[name] || {
    isActive: false,
    isUp: false,
    isDown: false,
  };
  const { isActive, isUp, isDown } = stateSort;
  const sort = useCallback(() => {
    clickSort(name, param);
  }, [clickSort, name, param]);

  return (
    <li
      className={classNames(
        cls.sortItem,
        {
          [cls.activeArrow]: isActive,
          [cls.up]: isUp,
          [cls.down]: isDown,
        },
        [],
      )}
    >
      <Button theme="icon-right" variant="down-arrow" onClick={sort}>
        {t(`${text}`)}
      </Button>
    </li>
  );
}

export const Sort = memo(SortItem);
