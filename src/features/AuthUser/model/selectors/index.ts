import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getAuthError = (state: StateSchema) => state?.authForm?.error || false;
export const getAuthLoading = (state: StateSchema) => state?.authForm?.isLoading || false;
