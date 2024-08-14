import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFavoritesPlayers } from 'entities/Favorites/model/types';

const initialState: IFavoritesPlayers = {
  players: [],
  message: 'В избранное ничего не добавлено',
};

export const favoritesPlayersSlice = createSlice({
  initialState,
  name: 'favoritesPlayers',
  reducers: {
    // ToDo: нужна ли установка из локалсторедж?
    setFavoritesPlayers: (state, action: PayloadAction<number[]>) => {
      state.players = action.payload;
      if (state.players.length === 0) {
        state.message = 'В избранное ничего не добавлено';
      }
    },
    addFavoritesPlayer: (state, action: PayloadAction<number>) => {
      state.players = [...state.players, action.payload];
      state.message = '';
      localStorage.setItem('favoritesPlayers', JSON.stringify(state.players));
    },
    deleteFavoritesPlayer: (state, action: PayloadAction<number>) => {
      state.players = state.players.filter((item) => item !== action.payload);
      if (state.players.length === 0) {
        state.message = 'В избранное ничего не добавлено';
      }
      localStorage.setItem('favoritesPlayers', JSON.stringify(state.players));
    },
  },
});

export const {
  actions: favoritesPlayersActions,
  reducer: favoritesPlayersReducer,
} = favoritesPlayersSlice;
