import { StateSchema } from 'app/providers/StoreProvider';

export const getCheckboxesFilterState = (state: StateSchema) => state?.filter?.checkboxes || {};
