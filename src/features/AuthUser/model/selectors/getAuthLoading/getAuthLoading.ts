import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getAuthLoading = (state: StateSchema) => state?.authForm?.isLoading || false;
