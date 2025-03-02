import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_FAVORITES, LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { FavoritesData } from 'shared/api/model/types/user/favorites';
import { syncFavorites } from '../services/syncFavorites/syncFavorites';
import { Favorites, FavoritePlayer, FavoriteClan } from '../types';
import { getFavorites } from '../services/getFavorites/getFavorites';
import { addPlayerToFavorites } from '../services/addPlayerToFavorites/addPlayerToFavorites';
import {
  removePlayerFromFavorites,
} from '../services/removePlayerFromFavorites/removePlayerFromFavorites';
import { addClanToFavorites } from '../services/addClanToFavorites/addClanToFavorites';
import {
  removeClanFromFavorites,
} from '../services/removeClanFromFavorites/removeClanFromFavorites';

const initialState: Favorites = {
  players: null,
  clans: null,
  isLoading: false,
  isToggleLoading: false,
};

const isAuthenticated = !!localStorage.getItem(LOCAL_STORAGE_USER_KEY);

const updateLocalStoragePlayers = (players: FavoritePlayer[]) => {
  try {
    if (LOCAL_STORAGE_FAVORITES in localStorage) {
      const localStorageData: FavoritesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITES));
      localStorageData.players = players;
      localStorage.setItem(LOCAL_STORAGE_FAVORITES, JSON.stringify(localStorageData));
    } else {
      localStorage.setItem(LOCAL_STORAGE_FAVORITES, JSON.stringify({ players, clans: [] }));
    }
  } catch (e) {
    console.error(e);
  }
};

const updateLocalStorageClans = (clans: FavoriteClan[]) => {
  try {
    if (LOCAL_STORAGE_FAVORITES in localStorage) {
      const localStorageData: FavoritesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITES));
      localStorageData.clans = clans;
      localStorage.setItem(LOCAL_STORAGE_FAVORITES, JSON.stringify(localStorageData));
    } else {
      localStorage.setItem(LOCAL_STORAGE_FAVORITES, JSON.stringify({ players: [], clans }));
    }
  } catch (e) {
    console.error(e);
  }
};

export const favoritesSlice = createSlice({
  initialState,
  name: 'favorites',
  reducers: {
    setFavoritesPlayers: (state, action: PayloadAction<FavoritePlayer[]>) => {
      state.players = action.payload;

      if (!isAuthenticated && !state.isLoading) updateLocalStoragePlayers(state.players);
    },
    addFavoritesPlayer: (state, action: PayloadAction<FavoritePlayer>) => {
      state.players = [...state.players, action.payload];

      if (!isAuthenticated) updateLocalStoragePlayers(state.players);
    },
    deleteFavoritesPlayer: (state, action: PayloadAction<FavoritePlayer>) => {
      state.players = state.players.filter(
        (item) => item.lestaData.account_id !== action.payload.lestaData.account_id,
      );

      if (!isAuthenticated) updateLocalStoragePlayers(state.players);
    },
    setFavoritesClans: (state, action: PayloadAction<FavoriteClan[]>) => {
      state.clans = action.payload;

      if (!isAuthenticated && !state.isLoading) updateLocalStorageClans(state.clans);
    },
    addFavoritesClan: (state, action: PayloadAction<FavoriteClan>) => {
      state.clans = [...state.clans, action.payload];

      if (!isAuthenticated) updateLocalStorageClans(state.clans);
    },
    deleteFavoritesClan: (state, action: PayloadAction<FavoriteClan>) => {
      state.clans = state.clans.filter((item) => item.clan_id !== action.payload.clan_id);

      if (!isAuthenticated) updateLocalStorageClans(state.clans);
    },
    resetStateToInitial: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.pending, (state) => {
        state.players = null;
        state.clans = null;
        state.isLoading = true;
      })
      .addCase(getFavorites.rejected, (state) => {
        state.players = [];
        state.clans = [];
        state.isLoading = false;
      })
      .addCase(getFavorites.fulfilled, (state, { payload }) => {
        state.players = payload.players;
        state.clans = payload.clans;

        if (!isAuthenticated) {
          updateLocalStoragePlayers(payload.players);
          updateLocalStorageClans(payload.clans);
        }

        state.isLoading = false;
      })
      .addCase(addPlayerToFavorites.pending, (state) => {
        state.isToggleLoading = true;
      })
      .addCase(addPlayerToFavorites.rejected, (state) => {
        state.isToggleLoading = false;
      })
      .addCase(addPlayerToFavorites.fulfilled, (state, { payload }) => {
        state.players = payload;

        state.isToggleLoading = false;
      })
      .addCase(removePlayerFromFavorites.pending, (state) => {
        state.isToggleLoading = true;
      })
      .addCase(removePlayerFromFavorites.rejected, (state) => {
        state.isToggleLoading = false;
      })
      .addCase(removePlayerFromFavorites.fulfilled, (state, { payload }) => {
        state.players = payload;

        state.isToggleLoading = false;
      })
      // clans
      .addCase(addClanToFavorites.pending, (state) => {
        state.isToggleLoading = true;
      })
      .addCase(addClanToFavorites.rejected, (state) => {
        state.isToggleLoading = false;
      })
      .addCase(addClanToFavorites.fulfilled, (state, { payload }) => {
        state.clans = payload;

        state.isToggleLoading = false;
      })
      .addCase(removeClanFromFavorites.pending, (state) => {
        state.isToggleLoading = true;
      })
      .addCase(removeClanFromFavorites.rejected, (state) => {
        state.isToggleLoading = false;
      })
      .addCase(removeClanFromFavorites.fulfilled, (state, { payload }) => {
        state.clans = payload;

        state.isToggleLoading = false;
      })
      // massive synchronization
      .addCase(syncFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(syncFavorites.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(syncFavorites.fulfilled, (state, { payload }) => {
        if (payload?.subscribes) {
          state.players = payload.subscribes;
        }

        if (payload?.clans) {
          state.clans = payload.clans;
        }

        state.isLoading = false;

        localStorage.removeItem(LOCAL_STORAGE_FAVORITES);
      });
  },
});

export const {
  actions: favoriteActions,
  reducer: favoriteReducer,
} = favoritesSlice;
