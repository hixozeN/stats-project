import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaUserState = (state: StateSchema) => state?.lesta?.user || null;
