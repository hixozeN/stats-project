import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoundClanData, FoundPlayerData } from '../types/FoundData';

export interface SearchSchema {
  search: string;
  players: FoundPlayerData[],
  clans: FoundClanData[],
}
const initialState: SearchSchema = {
  search: '',
  players: [],
  clans: [],
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
});

export const { actions: searchActions, reducer: searchReducer } = searchSlice;
