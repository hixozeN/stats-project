import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getTopTeams = (state: StateSchema) => state?.teams?.topTeams;
