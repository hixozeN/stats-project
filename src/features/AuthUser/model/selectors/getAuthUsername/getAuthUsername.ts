import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getAuthUsername = (state: StateSchema) => state?.authForm?.username || '';
