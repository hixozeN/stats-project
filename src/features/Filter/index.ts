export { Filter } from './ui/Filter/Filter';
export { filterReducer, filterActions } from './model/slice/filterSlice';
export { sortReducer, sortActions } from './model/slice/sortSlice';
export { getFilterItem } from './lib/getFilterData/getFilterItem';
export { NameSortItem, statList } from './config/sortData';
export {
  getSortList, getCheckboxesFilterState, getDataFilterState, getIsActiveFilter,
} from './model/selectors';
