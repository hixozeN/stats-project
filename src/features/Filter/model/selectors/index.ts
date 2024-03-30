import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getDataFilterState = (state: StateSchema) => state?.filter?.data;
// export const getParamsFilterState = (state: StateSchema) => state?.filter?.params;
export const getCheckboxesFilterState = (state: StateSchema) => state?.filter?.checkboxes;
