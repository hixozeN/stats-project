import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchLestaUserDataById,
} from 'entities/Lesta/index';
import { TUserTanks } from '../types/tanks';
import { LestaTanksSchema } from '../types';

const initialState: LestaTanksSchema = {
  isLoading: false,
  userTanks: null,
  error: null,
};

export const lestaTanksSlice = createSlice({
  name: 'lestaTanks',
  initialState,
  reducers: {
    setUserTanks: (state, action: PayloadAction<TUserTanks[]>) => {
      state.userTanks = action.payload;
    },
    // setTanksLastSession: (state, action: PayloadAction<LestaTankStats[]>) => {
    //   state.userTanks.lastSession = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLestaUserDataById.pending, (state) => {
        state.error = '';
        state.isLoading = true;
        // state.isNotFound = false;
      })
      .addCase(fetchLestaUserDataById.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
        // state.isNotFound = true;
      })
      .addCase(fetchLestaUserDataById.fulfilled, (state) => {
        state.isLoading = false;

        // if (!payload.account_id) state.isNotFound = true;
      });
  },
});

export const { actions: userTanksActions, reducer: userTanksReducer } = lestaTanksSlice;
