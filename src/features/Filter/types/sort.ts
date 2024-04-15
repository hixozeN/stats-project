import { NameSortItem } from '../config/sortData';

export type TSortItem = {
  isActive: boolean;
  isUp: boolean;
  isDown: boolean;
};

export type SortSchema = Record<NameSortItem, TSortItem>;
