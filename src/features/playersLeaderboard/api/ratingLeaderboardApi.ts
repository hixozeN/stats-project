import { rtkApi } from 'shared/api/rtkApi';
import {
  RatingItemFromLesta,
  RatingLeaderboardParams, RatingNeighborParams, RatingNeighbors,
  SeasonInfo,
} from '../model/types/ratingLeaderboard';

const ratingLeaderboardApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getSeasonInfo: build.query<SeasonInfo, void>({
      query: () => ({
        url: '/rating/lesta/season/',
      }),
    }),
    getLeaderboardByLeagueId: build.query<RatingItemFromLesta[], RatingLeaderboardParams>({
      query: ({ league }) => ({
        url: '/rating/lesta/leaderboard/',
        params: {
          league,
        },
      }),
    }),
    getNeighborsAtLeaderboard: build.query<RatingNeighbors, RatingNeighborParams>({
      query: ({ id, neighbors }) => ({
        url: '/rating/lesta/leaderboard/neighbors/',
        params: {
          id, neighbors,
        },
      }),
    }),
  }),
});

export const getSeasonInfo = ratingLeaderboardApi.endpoints.getSeasonInfo.initiate;
export const fetchLeaderboardByLeagueId = ratingLeaderboardApi.endpoints.getLeaderboardByLeagueId.initiate;
export const fetchLeaderboardNeighborsById = ratingLeaderboardApi.endpoints.getNeighborsAtLeaderboard.initiate;
