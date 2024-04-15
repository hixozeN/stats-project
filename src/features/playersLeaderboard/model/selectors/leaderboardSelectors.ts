import { StateSchema } from 'app/providers/StoreProvider';

export const getLeaderboardGeneral = (state: StateSchema) => state?.leaderboard?.general || null;
export const isGeneralLeaderboardLoading = (state: StateSchema) => state?.leaderboard?.isLoading || false;
