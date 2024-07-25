import { StateSchema } from 'app/providers/StoreProvider';

export const getLeaderboardGeneralFilters = (state: StateSchema) => state?.leaderboard?.generalFilters
  || { battles: 1000, sortBy: 'wn8' };
