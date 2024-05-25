import { TUserTanks } from 'entities/Lesta/model/types/tanks';

export interface FilterSchema {
  search?: string,
  data?: TUserTanks[];
  checkboxes?: Record<string, Record<string, boolean>>;
  isActiveFilter: boolean;
}
