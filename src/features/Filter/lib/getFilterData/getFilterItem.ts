import { filterData } from '../../config/filterData';

export const getFilterItem = (tab: number) => (tab === 1
  ? filterData.filter((item) => item.nameParam !== 'mark_of_mastery')
  : filterData);
