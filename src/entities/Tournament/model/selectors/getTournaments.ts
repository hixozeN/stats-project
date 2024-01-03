import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getTournaments = (state: StateSchema) => state?.tournaments?.tournaments;
