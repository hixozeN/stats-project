import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ParamData, TUserTanks } from 'entities/Lesta';
import {
  getSortList, sortActions, filterActions, NameSortItem,
} from 'features/Filter';
import { useAppDispatch } from '../useAppDispatch/useAppDispatch';

export const useSorting = (filter: TUserTanks[]) => {
  const [isSortOpen, setSortOpen] = useState(false);
  const stateSortList = useSelector(getSortList);
  const dispatch = useAppDispatch();

  const clickSort = useCallback((nameItem: NameSortItem, paramItem: keyof ParamData) => {
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
  }, [dispatch, filter, stateSortList]);

  const handleChangeMenu = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
      e.stopPropagation();
      setSortOpen(!isSortOpen);
    },
    [isSortOpen],
  );
  return { clickSort, handleChangeMenu, isSortOpen };
};
