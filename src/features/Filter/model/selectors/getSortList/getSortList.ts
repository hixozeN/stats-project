import { StateSchema } from 'app/providers/StoreProvider';

export const getSortList = (state: StateSchema) => state?.sort;
