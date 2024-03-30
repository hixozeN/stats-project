import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { IStatList, statList } from 'entities/Tank/config/TankData';
import { classNames } from 'shared/lib/classNames/classNames';
import { sortItem } from 'features/Filter/types/sort';
import { SearchForm } from 'features/Search';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckboxesFilterState } from 'features/Filter/model/selectors';
import { filterActions } from 'features/Filter/model/slice/filterSlice';
import { useFilterTanks } from 'features/Filter/hooks/useFilterTanks';
import { LOCAL_STORAGE_CHECKBOXES } from 'shared/consts/localstorage';
import { TUserTanks } from 'entities/Lesta/model/types/tanks';
import { Button } from '../../../../shared/ui/Button/Button';
import { FilterItem } from './FilterItem';
import { clearFiterData, filterData } from '../../config/filterData';
import { Sort } from '../Sort/Sort';
import cls from './Filter.module.scss';

function FilterWithCurtain() {
  const { t } = useTranslation('tank');
  const [isOpenFilter, setOpenFilter] = useState(false);
  const [sortState, setSortState] = useState<Record<string, any>>({});
  const dispatch = useDispatch();
  const checkboxes = useSelector(getCheckboxesFilterState);
  const filterDataTanks = useFilterTanks();

  useEffect(() => {
    if ('checkboxes' in localStorage) {
      localStorage.setItem(
        LOCAL_STORAGE_CHECKBOXES,
        JSON.stringify(clearFiterData),
      );
    }
    dispatch(filterActions.setFilterData(filterDataTanks));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeFilter = useCallback(
    (e) => {
      const { checked, name, id } = e.target;
      const param = id.split('-')[0];
      dispatch(filterActions.setCheckbox({ name, checked, param }));
    },
    [dispatch],
  );
  const setSortStateInit = () => {
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
  };

  useEffect(() => {
    setSortStateInit();
  }, []);

  const closeFilter = () => {
    setOpenFilter(false);
  };

  const applyFilter = () => {
    setSortStateInit();
    closeFilter();
    dispatch(filterActions.setFilterData(filterDataTanks));
  };

  const clearFilter = useCallback(() => {
    dispatch(filterActions.clearFilter());
    dispatch(filterActions.setFilterData(filterDataTanks));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const openFilter = () => {
    setOpenFilter(true);
  };

  const clickSort = async (nameItem: string, paramItem: string) => {
    let listSort: TUserTanks[] = [];
    statList.map((item) => setSortState((state: Record<string, sortItem>) => {
      if (nameItem === item.nameItem) {
        if (state[nameItem].isDown) {
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
    if (sortState[`${nameItem}`].isDown) {
      listSort = [...filterDataTanks].sort(
        (a: {[key: string]:any}, b: {[key: string]:any}) => a.statistics[`${paramItem}`] - b.statistics[`${paramItem}`],
      );
    }
    if (sortState[`${nameItem}`].isUp || !sortState[`${nameItem}`].isActive) {
      listSort = [...filterDataTanks].sort(
        (a: {[key: string]:any}, b: {[key: string]:any}) => b.statistics[`${paramItem}`] - a.statistics[`${paramItem}`],
      );
    }
    dispatch(filterActions.setFilterData(listSort));
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
            <fieldset className={cls.group} key={data.name} id={data.param}>
              <legend className={cls.legend}>{t(`${data.text}`)}</legend>
              <ul className={cls.filterList}>
                {data.values.map((value) => (
                  <FilterItem
                    value={value}
                    param={data.param}
                    name={data.name}
                    key={`${data.param}-${value}`}
                    onChange={onChangeFilter}
                    checked={checkboxes[`${data.param}`][`${value}`]}
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
