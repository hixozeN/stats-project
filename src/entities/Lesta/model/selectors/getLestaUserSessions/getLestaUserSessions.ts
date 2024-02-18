import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaUserSessions = (state: StateSchema) => state?.lesta?.user?.sessions || [];
