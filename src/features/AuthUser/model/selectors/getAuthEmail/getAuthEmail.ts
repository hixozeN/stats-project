import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getAuthEmail = (state: StateSchema) => state?.authForm?.email || '';
