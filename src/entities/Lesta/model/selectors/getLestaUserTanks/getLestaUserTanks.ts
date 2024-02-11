import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaUserTanks = (state: StateSchema) => state?.lesta?.userTanks || [];
