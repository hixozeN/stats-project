import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getLadders = (state: StateSchema) => state?.tournaments?.ladders;
