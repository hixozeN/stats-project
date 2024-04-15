import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchUsersAndClans } from 'features/Search';
import { FoundClanData, FoundPlayerData } from '../types/FoundData';

export interface SearchSchema {
  search: string;
  players: FoundPlayerData[],
  clans: FoundClanData[],
  isLoading: boolean,
  isNotFoundClans: boolean,
  isNotFoundPlayers: boolean,
  error: string,
  requestId?: string;
}
const initialState: SearchSchema = {
  search: '',
  players: [],
  clans: [],
  isLoading: false,
  isNotFoundClans: false,
  isNotFoundPlayers: false,
  error: '',
};
export const searchSlice = createSlice({
  name: 'searchForm',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setFoundPlayers: (state, action: PayloadAction<FoundPlayerData[]>) => {
      state.players = action.payload;
    },
    setFoundClans: (state, action: PayloadAction<FoundClanData[]>) => {
      state.clans = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsersAndClans.pending, (state, action) => {
        state.isLoading = true;
        state.isNotFoundClans = false;
        state.isNotFoundPlayers = false;
        state.requestId = action.meta.requestId;
      })
      .addCase(searchUsersAndClans.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(searchUsersAndClans.fulfilled, (state, { payload, meta }) => {
        if (state.requestId === meta.requestId) {
          state.isLoading = false;
          state.clans = payload.clans;
          state.players = payload.players;
          if (!payload.clans.length) state.isNotFoundClans = true;
          if (!payload.players.length) state.isNotFoundPlayers = true;
        }
      });
  },
});

export const { actions: searchActions, reducer: searchReducer } = searchSlice;
