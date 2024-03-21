import { StateSchema } from 'app/providers/StoreProvider/index';

export const getUserLastSession = (state: StateSchema) => state?.lesta?.user?.lastSession || null;
