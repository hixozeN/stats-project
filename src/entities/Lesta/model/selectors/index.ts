import { StateSchema } from 'app/providers/StoreProvider/index';

export const getSessionTanksStats = (state: StateSchema) => state?.lesta?.user?.lastSession?.tanks || [];
export const getActualTanksStats = (state: StateSchema) => state?.lesta?.user?.lastSession?.tanks || [];
