import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createLestaUserSession,
  LestaUserSessionSchema,
} from 'entities/Lesta/index';
import { ParamData } from '../types/default';
import { TUserTanks } from '../types/tanks';
import {
  fetchLestaUserSessionById,
} from '../services/fetchLestaUserSession/fetchLestaUserSession';

const initialState: LestaUserSessionSchema = {
  isLoading: false,
  isNotFound: false,
  error: null,
  data: {
    delta: null,
    statistics: null,
    rating: null,
    tanks: [],
    meta: null,
  },
};

export const userSessionSlice = createSlice({
  name: 'lestaUserSession',
  initialState,
  reducers: {
    setSessionDelta: (state, action: PayloadAction<ParamData>) => {
      state.data.delta = action.payload;
    },
    setSessionStatistics: (state, action: PayloadAction<ParamData>) => {
      state.data.statistics = action.payload;
    },
    setSessionTanks: (state, action: PayloadAction<TUserTanks[]>) => {
      state.data.tanks = [...action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLestaUserSessionById.pending, (state) => {
        state.error = '';
        state.isLoading = true;
        state.isNotFound = false;
      })
      .addCase(fetchLestaUserSessionById.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchLestaUserSessionById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data.delta = { ...payload.delta };
        state.data.statistics = { ...payload.statistics };
        state.data.rating = { ...payload.rating };
        state.data.tanks = payload.tanks;
        state.data.meta = payload.meta;
      })
      .addCase(createLestaUserSession.pending, (state) => {
        state.error = '';
        state.isLoading = true;
        state.isNotFound = false;
      })
      .addCase(createLestaUserSession.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(createLestaUserSession.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const { actions: userSessionActions, reducer: userSessionReducer } = userSessionSlice;
