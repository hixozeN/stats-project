import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaUserAvatar = (state: StateSchema) => state?.lesta?.user?.avatar || null;
