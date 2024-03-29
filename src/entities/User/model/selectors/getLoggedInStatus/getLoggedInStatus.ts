import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getLoggedInStatus = (state: StateSchema) => state?.user?.isLoggedIn || false;
