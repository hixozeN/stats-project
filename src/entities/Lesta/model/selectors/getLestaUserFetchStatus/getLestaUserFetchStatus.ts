import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaUserFetchStatus = (state: StateSchema) => state?.lesta?.isNotFound;
