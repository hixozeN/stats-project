import React, {
  memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { SearchForm } from 'features/Search';
import { useSelector } from 'react-redux';

import { filterActions } from 'features/Filter/model/slice/filterSlice';
import { useFilterTanks } from 'shared/hooks/useFilterTanks/useFilterTanks';
import { TUserTanks } from 'entities/Lesta/model/types/tanks';
import {
  ParamData,
  getLestaUserTanks,
  getUserSessionTanks,
} from 'entities/Lesta';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import {
  getCheckboxesFilterState,
} from 'features/Filter/model/selectors/getCheckboxesFilterState/getCheckboxesFilterState';
import { IStatList, NameSortItem, statList } from 'features/Filter/config/sortData';
import { sortActions } from 'features/Filter/model/slice/sortSlice';
import { getSortList } from 'features/Filter/model/selectors/getSortList/getSortList';
import { Button } from '../../../../shared/ui/Button/Button';
import { FilterItem } from './FilterItem';
import { filterData } from '../../config/filterData';
import { Sort } from '../Sort/Sort';
import cls from './Filter.module.scss';

interface FilterProps {
  tab?: number;
}

function FilterWithCurtain({ tab }: FilterProps) {
  const { t } = useTranslation('tank');
  const [isOpenFilter, setFilterOpen] = useState(false);
  const [isSortOpen, setSortOpen] = useState(false);
  const stateSortList = useSelector(getSortList);
  const dispatch = useAppDispatch();
  const checkboxes = useSelector(getCheckboxesFilterState);
  const { filter } = useFilterTanks(tab);
  const tanks = useSelector(getLestaUserTanks);
  const sessionTanks = useSelector(getUserSessionTanks);

  const onChangeFilter = useCallback(
    (e) => {
      const { checked, name, id } = e.target;
      const [param] = id.split('-');
      dispatch(filterActions.setCheckbox({ name, checked, param }));
    },
    [dispatch],
  );

  const closeFilter = useCallback(() => {
    setFilterOpen(false);
  }, []);

  const applyFilter = useCallback(() => {
    dispatch(sortActions.clearSort());
    closeFilter();
    dispatch(filterActions.setFilterData(filter));
    dispatch(filterActions.setIsActiveFilter());
  }, [closeFilter, dispatch, filter]);

  const clearFilter = useCallback(() => {
    if (tab === 0) dispatch(filterActions.setFilterData(tanks));
    if (tab === 1) dispatch(filterActions.setFilterData(sessionTanks));
    dispatch(filterActions.clearFilter());
    dispatch(sortActions.clearSort());
  }, [dispatch, sessionTanks, tab, tanks]);

  const openFilter = () => {
    setFilterOpen(true);
  };

  const clickSort = (nameItem: NameSortItem, paramItem: keyof ParamData) => {
    let listSort: TUserTanks[] = [];
    dispatch(sortActions.setSortData(nameItem));

    const getStatisticValue = (tank: TUserTanks): string | number => tank.statistics[paramItem];

    if (stateSortList[`${nameItem}`].isDown) {
      listSort = [...filter].sort(
        (a, b) => Number(getStatisticValue(a)) - Number(getStatisticValue(b)),
      );
    }

    if (stateSortList[nameItem].isUp || !stateSortList[nameItem].isActive) {
      listSort = [...filter].sort(
        (a, b) => Number(getStatisticValue(b)) - Number(getStatisticValue(a)),
      );
    }

    dispatch(filterActions.setFilterData(listSort));
  };

  const handleChangeMenu = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
      e.stopPropagation();
      setSortOpen(!isSortOpen);
    },
    [isSortOpen],
  );

  return (
    <>
      <div
        tabIndex={0}
        role="button"
        aria-label={t('Закрыть список сессий')}
        className={classNames(cls.overlay, {
          [cls.overlayActive]: isSortOpen || isOpenFilter,
        })}
        onClick={isSortOpen ? handleChangeMenu : closeFilter}
      />
      <div className={cls.filterPanel}>
        <SearchForm />
        <div className={cls.sortWrapper}>
          <ul
            className={classNames(cls.sortList, { [cls.openSort]: isSortOpen })}
          >
            {statList.map((item: IStatList) => (
              <Sort
                data={item}
                key={item.nameItem}
                clickSort={clickSort}
              />
            ))}
          </ul>
          <Button
            className={cls.buttonSort}
            onClick={handleChangeMenu}
            theme="icon-right"
            variant="sort"
          >
            {t('Сортировка')}
          </Button>
        </div>
        <Button
          className={cls.buttonFilter}
          onClick={openFilter}
          theme="icon-right"
          variant="filter"
        >
          {t('Фильтровать')}
        </Button>
        <form
          className={classNames(cls.filterForm, { [cls.open]: isOpenFilter })}
        >
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
    </>
  );
}

export const Filter = memo(FilterWithCurtain);
