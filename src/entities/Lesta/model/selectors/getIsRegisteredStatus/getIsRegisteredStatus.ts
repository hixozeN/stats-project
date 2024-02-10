import { StateSchema } from 'app/providers/StoreProvider/index';

export const getIsRegisteredStatus = (state: StateSchema) => !!state?.lesta?.user?.id;
