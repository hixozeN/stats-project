import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLeaderboardByWN8 = (state: StateSchema) => state?.stars?.data?.wn8 || null;
export const getLeaderboardByDamage = (state: StateSchema) => state?.stars?.data?.damage || null;
export const getLeaderboardByWinRate = (state: StateSchema) => state?.stars?.data?.winrate || null;
export const isLeaderBoardLoading = (state: StateSchema) => state?.stars?.isLoading || false;
// export const isLeaderBoardLoading = (state: StateSchema) => true;
