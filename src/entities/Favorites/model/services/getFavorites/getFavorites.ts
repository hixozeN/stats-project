import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { LOCAL_STORAGE_FAVORITES } from 'shared/consts/localstorage';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { FavoritesDataResponse, FavoritesData } from 'shared/api/model/types/user/favorites';

export const getFavorites = createAsyncThunk<FavoritesData, unknown, ThunkConfig<string>>(
  'GET_FAVORITES',
  async (_, thunkAPI) => {
    const {
      rejectWithValue, extra, getState,
    } = thunkAPI;

    try {
      const isLoggedIn = !!getState().user?.isLoggedIn;

      const favorites: FavoritesData = {
        players: [],
        clans: [],
      };

      if (isLoggedIn) {
        // auth block
        const favData = await extra.royalApi.get<FavoritesDataResponse>('/me/favorites').then((res) => res.data?.items);

        favorites.players = favData.players;
        favorites.clans = favData.clans;
      }

      if (LOCAL_STORAGE_FAVORITES in localStorage) {
        const localStorageFavData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITES));

        favorites.players = localStorageFavData.players;
        favorites.clans = localStorageFavData.clans;
      }

      return favorites;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message ?? SERVER_ERROR_MESSAGE);
    }
  },
);
