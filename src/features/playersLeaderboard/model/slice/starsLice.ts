// import { createSlice } from '@reduxjs/toolkit';
// import { getLeaderBoard } from '../services/getLeaderboard';
// import { LeaderboardSchema } from '../types/LeaderboardSchema';
//
// const initialState: LeaderboardSchema = {
//   isLoading: false,
//   error: '',
// };
//
// export const starsLice = createSlice({
//   name: 'stars',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getLeaderBoard.pending, (state) => {
//         state.error = '';
//         state.isLoading = true;
//       })
//       .addCase(getLeaderBoard.rejected, (state, { payload }) => {
//         state.error = payload;
//         state.isLoading = false;
//       })
//       .addCase(getLeaderBoard.fulfilled, (state, { payload }) => {
//         state.isLoading = false;
//
//         state.data = {
//           ...state.data,
//           [payload.sortBy]: payload.data,
//         };
//       });
//   },
// });
//
// export const { actions: starsActions, reducer: starsReducer } = starsLice;
import { createSlice } from '@reduxjs/toolkit';
import { LeaderboardSchema } from '../types/LeaderboardSchema';
import { getHallOfFame } from '../services/getHallOfFame';

const initialState: LeaderboardSchema = {
  isLoading: false,
  error: '',
};

export const starsLice = createSlice({
  name: 'stars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHallOfFame.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(getHallOfFame.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(getHallOfFame.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        state.data = {
          wn8: payload.wn8,
          damage: payload.damage,
          winrate: payload.winrate,
        };
      });
  },
});

export const { actions: starsActions, reducer: starsReducer } = starsLice;
