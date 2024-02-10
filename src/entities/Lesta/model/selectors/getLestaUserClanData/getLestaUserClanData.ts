import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaUserClanData = (state: StateSchema) => state?.lesta?.user?.clan || null;
