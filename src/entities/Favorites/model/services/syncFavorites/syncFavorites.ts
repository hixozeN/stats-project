import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { LOCAL_STORAGE_FAVORITES } from 'shared/consts/localstorage';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { FavoriteClan, FavoritePlayer, Favorites } from '../../types';

interface AsyncThunkData {
  subscribes: FavoritePlayer[];
  clans: FavoriteClan[];
}

export const syncFavorites = createAsyncThunk<AsyncThunkData, void, ThunkConfig<string>>(
  'SYNC_FAVORITES',
  async (_, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, extra } = thunkAPI;

    try {
      // подготовка стейта избранных при инициализации
      if (LOCAL_STORAGE_FAVORITES in localStorage) {
        const favorites: Favorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITES));

        return await extra.royalApi
          .put<AsyncThunkData>(
            '/user/subscribe/massive',
            { players: favorites.players.map((p) => p?.lestaData?.account_id), clans: favorites.clans },
          )
          .then((r) => r.data);
      }

      return rejectWithValue('Local storage have no favorite key.');
    } catch (e) {
      return rejectWithValue(e?.response?.data?.message || SERVER_ERROR_MESSAGE);
    }
  },
);
