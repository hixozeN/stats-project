import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  LestaUserDataSchema,
} from 'entities/Lesta/index';
import { ParamData } from 'entities/Lesta/model/types/default/index';
import {
  fetchUserDataByLestaId,
} from '../services/fetchUserDataByLestaId/fetchUserDataByLestaId';
import { LestaPrivateUserData, LestaUser, RatingValues } from '../types/users';
import { Clan } from '../../model/types/clans';

const initialState: LestaUserDataSchema = {
  isLoading: false,
  isNotFound: false,
  error: null,
  statistics: null,
  personal: null,
  private: null,
  rating: null,
  ratingValues: null,
  clan: null,
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
    setRatingData: (state, action: PayloadAction<ParamData>) => {
      state.rating = action.payload;
    },
    setRatingValues: (state, action: PayloadAction<RatingValues>) => {
      state.ratingValues = action.payload;
    },
    setUserStats: (state, action: PayloadAction<ParamData>) => {
      state.statistics = action.payload;
    },
    setUserClan: (state, action: PayloadAction<Clan>) => {
      state.clan = action.payload;
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
      })
      .addCase(fetchUserDataByLestaId.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        if (!payload?.userData?.personal?.account_id) state.isNotFound = true;
      });
  },
});

export const { actions: userDataActions, reducer: userDataReducers } = userDataSlice;
