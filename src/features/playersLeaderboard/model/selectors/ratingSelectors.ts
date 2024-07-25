import { StateSchema } from 'app/providers/StoreProvider';

export const getRatingLeaderboardState = (state: StateSchema) => state?.ratingLeaderboard || null;
export const getRatingError = (state: StateSchema) => state?.ratingLeaderboard?.error || null;

export const getRatingLeaderboardInitiated = (state: StateSchema) => state?.ratingLeaderboard?.isInitiated || false;
export const getRatingLeaderboardLoadingStatus = (state: StateSchema) => state?.ratingLeaderboard?.isLoading || false;
export const getRatingLeague = (state: StateSchema) => state?.ratingLeaderboard?.league || 0;
export const getSeasonInfo = (state: StateSchema) => state?.ratingLeaderboard?.seasonInfo || null;
export const getCurrentUserRatingData = (state: StateSchema) => state?.ratingLeaderboard?.currentUserData || null;
export const getLeaderboardHasMore = (state: StateSchema) => state?.ratingLeaderboard?.hasMore || false;

export const getCurrentUserRatingLoadingStatus = (
  state: StateSchema,
) => state?.ratingLeaderboard?.loaders?.isCurrentUserRatingLoading || false;
