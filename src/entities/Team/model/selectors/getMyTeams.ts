import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getMyTeams = (state: StateSchema) => state?.teams?.myTeams;
