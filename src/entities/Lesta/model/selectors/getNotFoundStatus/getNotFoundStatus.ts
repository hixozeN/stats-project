import { StateSchema } from 'app/providers/StoreProvider/index';

export const getNotFoundStatus = (state: StateSchema) => state?.lesta?.isNotFound || false;
