import { StateSchema } from 'app/providers/StoreProvider';

export const getDataFilterState = (state: StateSchema) => state?.filter?.data || [];
