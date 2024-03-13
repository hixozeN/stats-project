import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  LestaUserDataSchema,
} from 'entities/Lesta/index';
import {
  fetchUserDataByLestaId,
} from '../services/fetchUserDataByLestaId/fetchUserDataByLestaId';
import { LestaPrivateUserData, LestaUser } from '../types/users';

const initialState: LestaUserDataSchema = {
  isLoading: false,
  isNotFound: false,
  error: null,
  personal: null,
  private: null,
  rating: null,
  ratingValues: null,
};

export const userDataSlice = createSlice({
  name: 'lestaUserData',
  initialState,
  reducers: {
    setPersonalUserData: (state, action: PayloadAction<LestaUser>) => {
      state.personal = action.payload;
    },
    setPrivateUserData: (state, action: PayloadAction<LestaPrivateUserData>) => {
      state.private = action.payload;
    },
    setRatingData: (state, action: PayloadAction<any>) => {
      state.rating = action.payload;
    },
    setRatingValues: (state, action: PayloadAction<any>) => {
      state.ratingValues = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataByLestaId.pending, (state) => {
        state.error = '';
        state.isLoading = true;
        state.isNotFound = false;
      })
      .addCase(fetchUserDataByLestaId.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
        state.isNotFound = true;
      })
      .addCase(fetchUserDataByLestaId.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        if (!payload?.userData?.personal?.account_id) state.isNotFound = true;
      });
  },
});

export const { actions: userDataActions, reducer: userDataReducers } = userDataSlice;
