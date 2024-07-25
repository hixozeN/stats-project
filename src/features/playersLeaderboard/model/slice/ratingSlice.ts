import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getRatingNeighbors } from 'features/playersLeaderboard/model/services/getRatingNeighbors';
import {
  getRatingLeaderboard,
} from '../services/getRatingLeaderboard';
import { RatingItemFromLesta, SeasonInfo } from '../types/ratingLeaderboard';
import { RatingSchema } from '../types/RatingSchema';

const ratingLeaderBoardAdapter = createEntityAdapter<RatingItemFromLesta>({
  selectId: (player) => player.spa_id,
});

export const getLeaderboardMembers = ratingLeaderBoardAdapter.getSelectors<StateSchema>(
  (state) => state.ratingLeaderboard || ratingLeaderBoardAdapter.getInitialState(),
);

export const ratingSlice = createSlice({
  name: 'ratingLeaderboard',
  initialState: ratingLeaderBoardAdapter.getInitialState<RatingSchema>({
    ids: [],
    entities: {},
    isLoading: false,
    isInitiated: false,
    error: '',
    hasMore: false,
    league: 0,
    leaderboard: [],
    loaders: {
      isCurrentUserRatingLoading: false,
      isNeighborsLoading: false,
    },
  }),
  reducers: {
    initState: (state) => {
      state.isInitiated = true;
    },
    setSeasonData: (state, action: PayloadAction<SeasonInfo>) => {
      state.seasonInfo = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLeague: (state, action: PayloadAction<number>) => {
      state.league = action.payload;
    },
    setCurrentUserData: (state, action: PayloadAction<RatingItemFromLesta>) => {
      state.currentUserData = action.payload;
    },
    setCurrentUserRatingLoading: (state, action: PayloadAction<boolean>) => {
      state.loaders.isCurrentUserRatingLoading = action.payload;
    },
    setNeighborsLoading: (state, action: PayloadAction<boolean>) => {
      state.loaders.isNeighborsLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRatingLeaderboard.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) {
          ratingLeaderBoardAdapter.removeAll(state);
        }
      })
      .addCase(getRatingLeaderboard.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(getRatingLeaderboard.fulfilled, (state, { payload, meta }) => {
        state.isLoading = false;

        // state.hasMore = state.seasonInfo.count > (state.leaderboard.length + payload.length);
        state.hasMore = payload.length > 0;

        if (meta.arg.replace) {
          ratingLeaderBoardAdapter.setAll(state, payload);
        } else {
          ratingLeaderBoardAdapter.addMany(state, payload);
        }
      })
      .addCase(getRatingNeighbors.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getRatingNeighbors.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getRatingNeighbors.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.hasMore = payload.neighbors.length > 0;

        ratingLeaderBoardAdapter.addMany(state, payload.neighbors);
      });
  },
});

export const { actions: ratingActions, reducer: ratingReducer } = ratingSlice;
