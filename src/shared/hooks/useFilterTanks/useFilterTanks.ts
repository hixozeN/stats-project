import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { TUserTanks } from 'entities/Lesta';
import { sortActions, filterActions, getCheckboxesFilterState } from 'features/Filter';
import { useAppDispatch } from '../useAppDispatch/useAppDispatch';

export const useFilterTanks = (dataList: TUserTanks[]) => {
  const [isOpenFilter, setFilterOpen] = useState(false);
  const dispatch = useAppDispatch();
  const checkboxes = useSelector(getCheckboxesFilterState);

  const filter = Object.keys(checkboxes).reduce((result, item) => {
    const data = Object.entries(checkboxes[`${item}`]).map(
      ([key, value]) => value && key,
    );
    const [dataParam, param] = item.split('.');

    if (data.every((itemData) => !itemData)) {
      return result;
    }
    // ToDo: избавиться от any
    return result.filter((tank: { [key: string]: any }) => data.find(
      (tankItem) => !!tank[dataParam][param]
          && tankItem === tank[dataParam][param].toString(),
    ));
  }, dataList);

  const closeFilter = useCallback(() => {
    setFilterOpen(false);
  }, []);

  const handlwApplyFilter = useCallback(() => {
    dispatch(sortActions.clearSort());
    dispatch(filterActions.setFilterData(filter));
    dispatch(filterActions.setIsActiveFilter());
    closeFilter();
  }, [closeFilter, dispatch, filter]);

  const openFilter = () => {
    setFilterOpen(true);
  };

  const handleClearFilter = useCallback(() => {
    dispatch(filterActions.clearFilter());
    dispatch(sortActions.clearSort());
    dispatch(filterActions.setFilterData(dataList));
  }, [dataList, dispatch]);

  const onChangeFilter = useCallback(
    (e) => {
      const { checked, name, id } = e.target;
      const [param] = id.split('-');
      dispatch(filterActions.setCheckbox({ name, checked, param }));
    },
    [dispatch],
  );

  return {
    isOpenFilter, filter, openFilter, handlwApplyFilter, closeFilter, handleClearFilter, onChangeFilter,
  };
};
