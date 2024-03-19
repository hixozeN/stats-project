import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaLoadingStatus = (state: StateSchema) => state?.lesta?.isLoading;
