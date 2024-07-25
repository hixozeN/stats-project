import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLeaderBoard } from '../services/getLeaderboard';
import { LeaderboardSchema, SortValue } from '../types/LeaderboardSchema';

const initialState: LeaderboardSchema = {
  isLoading: false,
  error: '',
  generalFilters: {
    battles: 1000,
    sortBy: 'wn8',
  },
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setBattles: (state, action: PayloadAction<number>) => {
      state.generalFilters.battles = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortValue>) => {
      state.generalFilters.sortBy = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.ratingFilters.page = action.payload;
    },
    setCountToDisplay: (state, action: PayloadAction<number>) => {
      state.ratingFilters.count = action.payload;
    },
    setLeague: (state, action: PayloadAction<number>) => {
      state.ratingFilters.league = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderBoard.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(getLeaderBoard.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(getLeaderBoard.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        state.general = payload;
      });
  },
});

export const { actions: leaderboardActions, reducer: leaderboardReducer } = leaderboardSlice;
