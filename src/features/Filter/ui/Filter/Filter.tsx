import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IStatList, statList } from 'entities/Tank/config/TankData';
import { classNames } from 'shared/lib/classNames/classNames';
import { sortItem } from 'features/Filter/types/sort';
import { SearchForm } from 'features/Search';
import { Button } from '../../../../shared/ui/Button/Button';
import { FilterItem } from './FilterItem';
import { filterData } from '../../config/filterData';
import { Sort } from '../Sort/Sort';
import cls from './Filter.module.scss';

interface TanksProps<T> {
  filterList?: T[];
}

function FilterWithCurtain<T>({ filterList }: TanksProps<T>) {
  const { t } = useTranslation('tank');
  const [isOpenFilter, setOpenFilter] = useState(false);
  const [sortState, setSortState] = useState({});
  useEffect(() => {
    statList.map((item) => setSortState((state: Record<string, sortItem>) => {
      if (item.nameItem === 'lastBattle') {
        return {
          ...state,
          [item.nameItem]: { isActive: true, isUp: false, isDown: true },
        };
      }
      return {
        ...state,
        [item.nameItem]: { isActive: false, isUp: false, isDown: false },
      };
    }));
  }, []);
  // const sortUp = (datatList: T[], param: string | number) => datatList.sort((a, b) => b[param] - a[param]);

  const closeFilter = () => {
    setOpenFilter(false);
  };

  const applyFilter = () => {
    closeFilter();
  };

  const clearFilter = () => {};

  const openFilter = () => {
    setOpenFilter(true);
  };

  const clickSort = async (nameItem: string, paramItem: string) => {
    const sort = statList.map((item) => setSortState((state: Record<string, sortItem>) => {
      if (nameItem === item.nameItem) {
        if (state[nameItem].isDown) {
          // setFilterList(
          //   filterList.sort((a, b) => b[paramItem] - a[paramItem]),
          // );
          return {
            ...state,
            [item.nameItem]: { isActive: true, isUp: true, isDown: false },
          };
        }
        return {
          ...state,
          [item.nameItem]: { isActive: true, isUp: false, isDown: true },
        };
      }
      return {
        ...state,
        [item.nameItem]: { isActive: false, isUp: false, isDown: false },
      };
    }));
  };

  return (
    <div className={cls.tanks}>
      <SearchForm />
      <ul className={cls.sortList}>
        {statList.map((item: IStatList) => (
          <Sort
            data={item}
            key={item.nameItem}
            clickSort={clickSort}
            state={sortState}
          />
        ))}
      </ul>
      <Button onClick={openFilter}>{t('Настроить фильтр')}</Button>
      <div className={classNames(cls.wrapper, { [cls.open]: isOpenFilter })}>
        <form className={cls.filterForm}>
          {filterData.map((data) => (
            <fieldset className={cls.group} key={data.name}>
              <legend className={cls.legend}>{t(`${data.text}`)}</legend>
              <ul className={cls.filterList}>
                {data.values.map((value) => (
                  <FilterItem
                    value={value}
                    param={data.param}
                    name={data.name}
                    key={`${data.param}-${value}`}
                  />
                ))}
              </ul>
            </fieldset>
          ))}
          <ul className={cls.buttonList}>
            <li className={cls.buttonItem}>
              <Button onClick={clearFilter} theme="clear">
                {t('Сбросить')}
              </Button>
            </li>
            <li className={cls.buttonItem}>
              <Button onClick={applyFilter}>{t('Фильтр')}</Button>
            </li>
            <li className={cls.buttonItem}>
              <Button theme="clear" variant="close" onClick={closeFilter} />
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export const Filter = memo(FilterWithCurtain);
