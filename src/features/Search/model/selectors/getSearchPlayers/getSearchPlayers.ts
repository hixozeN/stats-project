import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getSearchPlayers = (state: StateSchema) => state?.searchForm?.players || [];
