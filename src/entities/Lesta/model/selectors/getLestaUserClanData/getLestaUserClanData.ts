import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaUserClanData = (state: StateSchema) => state?.lestaClanData?.clan || null;
