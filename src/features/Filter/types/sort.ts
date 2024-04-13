import { NameSortItem } from '../config/sortData';

export type TSortItem = {
  isActive: boolean;
  isUp: boolean;
  isDown: boolean;
};

export type SortScheme = Record<NameSortItem, TSortItem>;
