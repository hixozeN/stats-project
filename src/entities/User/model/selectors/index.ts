import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getUserAuthInitiation = (state: StateSchema) => state?.user?.isInitiated || false;
export const getUserData = (state: StateSchema) => state?.user?.authData || null;
export const getLoggedInStatus = (state: StateSchema) => state?.user?.isLoggedIn || false;
export const getCurrentUserError = (state: StateSchema) => state?.user?.error || 'Требуется повторная авторизация.';
export const getFullUserState = (state: StateSchema) => state?.user || null;
export const getTokenUpdateStatus = (state: StateSchema) => state?.user?.isTokenRefreshing || false;
