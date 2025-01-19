import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFavoritesData, IFavoritesPlayers } from 'entities/Favorites/model/types';
import { fetchFavoritesData } from 'entities/Favorites/model/services/fetchFavoritesData/fetchFavoritesData';

const initialState: IFavoritesPlayers = {
  players: [],
  message: 'В избранное ничего не добавлено',
  isLoading: false,
};

export const favoritesPlayersSlice = createSlice({
  initialState,
  name: 'favoritesPlayers',
  reducers: {
    setFavoritesPlayers: (state, action: PayloadAction<IFavoritesData[]>) => {
      state.players = action.payload;
      if (state.players.length === 0) {
        state.message = 'В избранное ничего не добавлено';
      }
    },
    addFavoritesPlayer: (state, action: PayloadAction<IFavoritesData>) => {
      state.players = [...state.players, action.payload];
      state.message = '';
      localStorage.setItem('favoritesPlayers', JSON.stringify(state.players));
    },
    deleteFavoritesPlayer: (state, action: PayloadAction<IFavoritesData>) => {
      state.players = state.players.filter((item) => item !== action.payload);
      if (state.players.length === 0) {
        state.message = 'В избранное ничего не добавлено';
      }
      localStorage.setItem('favoritesPlayers', JSON.stringify(state.players));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesData.pending, (state) => {
        state.players = null;
      })
      .addCase(fetchFavoritesData.rejected, (state) => {
        state.players = null;
        state.isLoading = false;
      })
      .addCase(fetchFavoritesData.fulfilled, (state, { payload }) => {
        state.players = payload;
      // })
      // .addCase(fetchFavoritesData.pending, (state) => {
      //   state.players = null;
      // })
      // .addCase(fetchFavoritesData.rejected, (state) => {
      //   state.players = null;
      //   state.isLoading = false;
      // })
      // .addCase(fetchFavoritesData.fulfilled, (state, { payload }) => {
      //   state.players = payload;
      });
  },
});

export const {
  actions: favoritesPlayersActions,
  reducer: favoritesPlayersReducer,
} = favoritesPlayersSlice;
