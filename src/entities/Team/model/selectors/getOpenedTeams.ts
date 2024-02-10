import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getOpenedTeams = (state: StateSchema) => state?.teams?.openedTeams;
