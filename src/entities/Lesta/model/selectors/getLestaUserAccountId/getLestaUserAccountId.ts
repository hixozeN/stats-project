import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaUserAccountId = (state: StateSchema) => state?.lesta?.user?.account_id || 0;
