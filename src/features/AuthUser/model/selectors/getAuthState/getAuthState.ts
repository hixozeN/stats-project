import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getAuthState = (state: StateSchema) => state?.authForm;
