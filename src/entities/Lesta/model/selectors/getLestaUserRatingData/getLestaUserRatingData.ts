import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaUserRatingData = (state: StateSchema) => state?.lesta?.user?.rating || null;
