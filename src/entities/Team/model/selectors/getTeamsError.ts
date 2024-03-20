import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getTeamsError = (state: StateSchema) => state?.teams?.error;
