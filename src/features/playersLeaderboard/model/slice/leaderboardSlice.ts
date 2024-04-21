import { createSlice } from '@reduxjs/toolkit';
import { getLeaderBoard } from '../services/getLeaderboard';
import { LeaderboardSchema } from '../types/LeaderboardSchema';

const initialState: LeaderboardSchema = {
  isLoading: false,
  error: '',
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
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
