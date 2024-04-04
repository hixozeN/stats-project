import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getDataFilterState = (state: StateSchema) => state?.filter?.data;
export const getCheckboxesFilterState = (state: StateSchema) => state?.filter?.checkboxes;
