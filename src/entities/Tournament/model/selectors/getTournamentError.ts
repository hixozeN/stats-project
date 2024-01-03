import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getTournamentError = (state: StateSchema) => state?.tournaments?.error;
