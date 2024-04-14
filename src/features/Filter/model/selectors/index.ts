import { StateSchema } from 'app/providers/StoreProvider';

export const getCheckboxesFilterState = (state: StateSchema) => state?.filter?.checkboxes || {};
export const getDataFilterState = (state: StateSchema) => state?.filter?.data || [];
export const getIsActiveFilter = (state: StateSchema) => state?.filter?.isActiveFilter || false;
export const getSortList = (state: StateSchema) => state?.sort;
