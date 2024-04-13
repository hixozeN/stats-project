import React, { useCallback, useState } from 'react';
import { sortActions } from 'features/Filter/model/slice/sortSlice';
import { useSelector } from 'react-redux';
import { getSortList } from 'features/Filter/model/selectors/getSortList/getSortList';
import { TUserTanks } from 'entities/Lesta/model/types/tanks';
import { filterActions } from 'features/Filter/model/slice/filterSlice';
import { NameSortItem } from 'features/Filter/config/sortData';
import { ParamData } from 'entities/Lesta';
import { useAppDispatch } from '../useAppDispatch/useAppDispatch';

export const useSorting = (filter: TUserTanks[]) => {
  const [isSortOpen, setSortOpen] = useState(false);
  const stateSortList = useSelector(getSortList);
  const dispatch = useAppDispatch();

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
  return { clickSort, handleChangeMenu, isSortOpen };
};
