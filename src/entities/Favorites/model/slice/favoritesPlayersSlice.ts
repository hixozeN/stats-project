import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFavoritesPlayers, IFavoritesData } from 'entities/Favorites/model/types';

const initialState: IFavoritesPlayers = {
  players: [],
  message: 'В избранное ничего не добавлено',
};

export const favoritesPlayersSlice = createSlice({
  initialState,
  name: 'favoritesPlayers',
  reducers: {
    addFavoritesPlayer: (state, action: PayloadAction<IFavoritesData>) => {
      state.players = [...state.players, action.payload];
      state.message = '';
    },
    deleteFavoritesPlayer: (state, action: PayloadAction<IFavoritesData>) => {
      state.players = state.players.filter((item) => item.id !== action.payload.id);
      if (state.players.length === 0) {
        state.message = 'В избранное ничего не добавлено';
      }
    },
  },
});

export const {
  actions: favoritesPlayersActions,
  reducer: favoritesPlayersReducer,
} = favoritesPlayersSlice;
