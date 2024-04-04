import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getAuthState = (state: StateSchema) => state?.authForm || null;
export const getAuthEmail = (state: StateSchema) => state?.authForm?.email || '';
export const getAuthError = (state: StateSchema) => state?.authForm?.error || false;
export const getAuthLoading = (state: StateSchema) => state?.authForm?.isLoading || false;
export const getAuthPassword = (state: StateSchema) => state?.authForm?.password || '';
export const getAuthUsername = (state: StateSchema) => state?.authForm?.username || '';
