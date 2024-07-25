import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LestaClanSchema } from '../types';
import { LestaClan } from '../types/clans';
import { fetchLestaClanData } from '../services/fetchLestaClanData/fetchLestaClanData';

const initialState: LestaClanSchema = {
  isLoading: false,
  clan: null,
  error: null,
  isNotFound: false,
};

export const lestaClanSlice = createSlice({
  name: 'lestaClanData',
  initialState,
  reducers: {
    setClanData: (state, action: PayloadAction<LestaClan>) => {
      state.clan = action.payload;
    },
    setNotFound: (state, action: PayloadAction<boolean>) => {
      state.isNotFound = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLestaClanData.pending, (state) => {
        state.error = '';
        state.isLoading = true;
        state.isNotFound = false;
        state.clan = null;
      })
      .addCase(fetchLestaClanData.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchLestaClanData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.clan = payload;

        if (!payload?.clan_id) state.isNotFound = true;
      });
  },
});

export const { actions: clanActions, reducer: clanReducers } = lestaClanSlice;
