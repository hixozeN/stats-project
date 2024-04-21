import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getSearchState = (state: StateSchema) => state?.searchForm;
