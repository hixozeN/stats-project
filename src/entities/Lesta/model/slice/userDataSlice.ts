import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  LestaUserDataSchema, LestaUserSession,
} from 'entities/Lesta/index';
import { ParamData } from '../types/default';
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
    resetUserData: (state) => {
      state.personal = null;
      state.statistics = null;
      state.isNotFound = null;
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
    setNotFoundStatus: (state, action: PayloadAction<boolean>) => {
      state.isNotFound = action.payload;
    },
    setUserSessions: (state, action: PayloadAction<LestaUserSession[]>) => {
      state.personal.sessions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataByLestaId.pending, (state) => {
        state.clan = null;
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

        state.personal = payload.userData?.personal;
        state.rating = payload.userData?.rating;
        state.ratingValues = payload.userData?.ratingValues;
        state.statistics = payload.userData?.statistics;

        if (payload.userData?.clan) state.clan = payload.userData.clan;
        if (payload.userData.private) state.private = payload.userData.private;

        if (!payload?.userData?.personal?.lestaData?.account_id) state.isNotFound = true;
      });
  },
});

export const { actions: userDataActions, reducer: userDataReducer } = userDataSlice;
