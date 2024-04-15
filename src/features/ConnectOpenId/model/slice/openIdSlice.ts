import { createSlice } from '@reduxjs/toolkit';
import { OpenIdSchema } from '../types/OpenIdSchema';
import { connectLestaOpenId } from '../services/connectLestaOpenId/connectLestaOpenId';

const initialState: OpenIdSchema = {
  isInitiated: false,
};

export const openIdSlice = createSlice({
  name: 'openId',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connectLestaOpenId.pending, (state) => {
        state.isInitiated = true;
        state.isLoading = true;
      })
      .addCase(connectLestaOpenId.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(connectLestaOpenId.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { actions: openIdActions, reducer: openIdReducer } = openIdSlice;
