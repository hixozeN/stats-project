import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaUserStatisticsData = (state: StateSchema) => state?.lesta?.user?.statistics || null;
