import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getTeamsLoadingStatus = (state: StateSchema) => state?.teams?.isLoading;
