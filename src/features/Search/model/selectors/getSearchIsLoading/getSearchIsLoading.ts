import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getSearchIsLoading = (state: StateSchema) => state?.searchForm?.isLoading || false;
