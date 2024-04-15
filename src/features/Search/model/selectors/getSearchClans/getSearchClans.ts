import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getSearchClans = (state: StateSchema) => state?.searchForm?.clans || [];
