import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getUserData = (state: StateSchema) => state?.user?.authData || null;
export const getLoggedInStatus = (state: StateSchema) => state?.user?.isLoggedIn || false;
export const getCurrentUserError = (state: StateSchema) => state?.user?.error || '';
export const getFullUserState = (state: StateSchema) => state?.user || null;
