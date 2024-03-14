import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaClanMembers = (state: StateSchema) => state?.lestaClanData?.clan?.members || [];
