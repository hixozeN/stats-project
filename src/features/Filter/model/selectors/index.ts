import { StateSchema } from 'app/providers/StoreProvider';

export const getCheckboxesFilterState = (state: StateSchema) => state?.filter?.checkboxes || {};
export const getDataFilterState = (state: StateSchema) => state?.filter?.data || null;
export const getIsActiveFilter = (state: StateSchema) => state?.filter?.isActiveFilter || false;
export const getSearchFilter = (state: StateSchema) => state?.filter?.search || '';
export const getIsActiveSearch = (state: StateSchema) => state?.filter?.isActiveSearch || false;
export const getSortList = (state: StateSchema) => state?.sort || null;
