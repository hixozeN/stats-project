import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getIsActiveFilter = (state: StateSchema) => state?.filter?.isActiveFilter || false;
