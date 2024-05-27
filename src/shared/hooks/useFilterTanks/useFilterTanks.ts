import {
  ChangeEvent, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { TUserTanks } from 'entities/Lesta';
import {
  sortActions, filterActions, getCheckboxesFilterState,
} from 'features/Filter';
import { getIsActiveSearch, getSearchFilter } from 'features/Filter/model/selectors';
import { getSearchTanks } from 'features/Filter/lib/getSearchTanks/getSearchTanks';
import { useAppDispatch } from '../useAppDispatch/useAppDispatch';

export const useFilterTanks = (dataList: TUserTanks[]) => {
  const [isOpenFilter, setFilterOpen] = useState(false);
  const isActiveSearch = useSelector(getIsActiveSearch);
  const dispatch = useAppDispatch();
  const checkboxes = useSelector(getCheckboxesFilterState);
  const search = useSelector(getSearchFilter);

  const filter = useMemo(() => Object.keys(checkboxes)
    .reduce((result: TUserTanks[], item: string) => {
      const data = Object.entries(checkboxes[`${item}`])
        .map(
          ([key, value]) => value && key,
        );
      const [dataParam, param] = item.split('.');

      if (data.every((itemData) => !itemData)) {
        return getSearchTanks(search, result);
      }

      // ToDo: избавиться от any
      return getSearchTanks(search, result.filter((tank: { [key: string]: any }) => data.find(
        (tankItem) => !!tank[dataParam][param]
          && tankItem === tank[dataParam][param].toString(),
      )));
    }, dataList), [checkboxes, dataList, search]);

  const openFilter = useCallback(() => {
    setFilterOpen(true);
    dispatch(filterActions.clearSearch());
  }, [dispatch]);

  const closeFilter = useCallback(() => {
    setFilterOpen(false);
  }, []);

  const handleClearFilter = useCallback(() => {
    dispatch(filterActions.clearFilter());
    dispatch(sortActions.clearSort());
    dispatch(filterActions.clearSearch());
    dispatch(filterActions.setFilterData(dataList));
  }, [dataList, dispatch]);

  const handleApplyFilter = useCallback(() => {
    dispatch(sortActions.clearSort());
    dispatch(filterActions.setFilterData(filter));
    dispatch(filterActions.setIsActiveFilter());
    dispatch(filterActions.clearSearch());
    closeFilter();
  }, [closeFilter, dispatch, filter]);

  const onChangeFilter = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        checked,
        name,
        id,
      } = e.target;

      const [param] = id.split('-');
      dispatch(filterActions.setCheckbox({
        name,
        checked,
        param,
      }));
    },
    [dispatch],
  );

  const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      value,
    } = e.target;

    if (value === '') {
      dispatch(filterActions.clearSearch());
    }
    dispatch(filterActions.setSearchValue(value));
    dispatch(filterActions.isActiveSearch());
    dispatch(sortActions.clearSort());
  }, [dispatch]);

  useEffect(() => {
    if (isActiveSearch || isOpenFilter) {
      dispatch(filterActions.setFilterData(getSearchTanks(search, filter)));
    }
  }, [dispatch, filter, isActiveSearch, isOpenFilter, search]);

  return {
    isOpenFilter,
    filter,
    openFilter,
    handleApplyFilter,
    closeFilter,
    handleClearFilter,
    onChangeFilter,
    onChangeSearch,
  };
};
