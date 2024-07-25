import { rtkApi } from 'shared/api/rtkApi';
import {
  PlayersLeaderboardParams,
} from '../model/types/playerLeaderboard';
import { ILeaderboardItem } from '../model/types/ILeaderboardItem';

const playersLeaderboardApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getPlayersLeaderboard: build.query<ILeaderboardItem[], PlayersLeaderboardParams>({
      query: ({ battles, sortBy, limit }) => ({
        url: '/rating/users',
        params: {
          battles, sortBy, limit,
        },
      }),
    }),
  }),
});

export const { useGetPlayersLeaderboardQuery } = playersLeaderboardApi;
