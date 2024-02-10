import { StateSchema } from 'app/providers/StoreProvider/index';

export const getUserSessions = (state: StateSchema) => state?.lesta?.user?.sessions || null;
