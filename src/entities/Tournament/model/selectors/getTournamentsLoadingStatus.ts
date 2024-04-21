import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getTournamentsLoadingStatus = (state: StateSchema) => state?.tournaments?.isLoading;
