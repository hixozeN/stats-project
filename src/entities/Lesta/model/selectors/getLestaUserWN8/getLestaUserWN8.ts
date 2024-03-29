import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaUserWN8 = (state: StateSchema) => state?.lesta?.user?.wn8 || 0;
