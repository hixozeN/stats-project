import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getUserAuthInitiation = (state: StateSchema) => state?.user?.isInitiated || false;
export const getUserData = (state: StateSchema) => state?.user?.authData || null;
export const getLoggedInStatus = (state: StateSchema) => state?.user?.isLoggedIn || false;
export const getCurrentUserError = (state: StateSchema) => state?.user?.error || '';
export const getFullUserState = (state: StateSchema) => state?.user || null;
export const getTokenUpdateStatus = (state: StateSchema) => state?.user?.isTokenRefreshing || false;
export const getLestaAccessToken = (state: StateSchema) => state?.user?.authData?.lestaData?.access_token || null;
export const getCurrentUserAccountId = (state: StateSchema) => state?.user?.authData?.lestaData?.account_id || null;
export const getUpdateProfileError = (state: StateSchema) => state?.user?.updateProfileError || '';
export const getCurrentUserAvatar = (state: StateSchema) => state?.user?.authData?.avatar || null;
export const getCurrentUserSettings = (state: StateSchema) => state?.user?.authData?.settings || {};
