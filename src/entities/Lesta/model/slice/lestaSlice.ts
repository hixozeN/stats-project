import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchLestaUserDataById,
  LestaUserSession,
} from 'entities/Lesta/index';
import { LestaTankStats } from '../types/tanks';
import { LestaClan } from '../types/clans';
import { LestaUser } from '../types/users';
import { LestaSchema } from '../types';

const initialState: LestaSchema = {
  isLoading: false,
  user: null,
  userTanks: null,
  clan: null,
  error: null,
  isNotFound: false,
};

export const lestaSlice = createSlice({
  name: 'lesta',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<LestaUser>) => {
      state.user = action.payload;
    },
    setClanData: (state, action: PayloadAction<LestaClan>) => {
      state.clan = action.payload;
    },
    setUserTanks: (state, action: PayloadAction<LestaTankStats[]>) => {
      state.userTanks = action.payload;
    },
    setLastSession: (state, action: PayloadAction<LestaUserSession>) => {
      state.user.lastSession = action.payload;
    },
    setNotFound: (state, action: PayloadAction<boolean>) => {
      state.isNotFound = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLestaUserDataById.pending, (state) => {
        state.error = '';
        state.isLoading = true;
        state.isNotFound = false;
      })
      .addCase(fetchLestaUserDataById.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
        state.isNotFound = true;
      })
      .addCase(fetchLestaUserDataById.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        if (!payload.account_id) state.isNotFound = true;
      });
  },
});

export const { actions: lestaActions, reducer: lestaReducer } = lestaSlice;
