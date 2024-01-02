import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getFinishedTournaments = (state: StateSchema) => state?.tournaments?.finished;
