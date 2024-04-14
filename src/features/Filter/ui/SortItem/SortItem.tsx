import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import cls from './SortItem.module.scss';
import { IStatList, NameSortItem } from '../../config/sortData';
import { getSortList } from '../../model/selectors';

interface SortProps {
  data?: IStatList;
  clickSort?: (nameItem: NameSortItem, paramItem: string) => void;
}

function SortItem({ data, clickSort }: SortProps) {
  const { t } = useTranslation('tank');
  const { nameItem: name, text, param } = data;
  const stateSort = useSelector(getSortList)[name];
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
