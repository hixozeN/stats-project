import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { LOCAL_STORAGE_FAVORITES } from 'shared/consts/localstorage';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import {
  DeletePlayerFromFavoritesResponse,
  FavoritesData,
} from 'shared/api/model/types/user/favorites/index';

export interface ThunkProps {
  account_id: number;
}

export const removePlayerFromFavorites = createAsyncThunk<FavoritesData['players'], ThunkProps, ThunkConfig<string>>(
  'REMOVE_PLAYER_FROM_FAVORITES',
  async (props, thunkAPI) => {
    const {
      rejectWithValue, extra, getState,
    } = thunkAPI;
    const { account_id } = props;

    try {
      const isLoggedIn = !!getState().user?.isLoggedIn;

      if (isLoggedIn) {
        const favData = await extra.royalApi
          .delete<DeletePlayerFromFavoritesResponse>(`/user/unsubscribe/${account_id}`)
          .then((res) => res.data?.items);

        return favData;
      }

      if (LOCAL_STORAGE_FAVORITES in localStorage) {
        const localStorageFavData: FavoritesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITES));
        localStorageFavData.players = localStorageFavData.players.filter((p) => p.lestaData.account_id !== account_id);
        localStorage.setItem(LOCAL_STORAGE_FAVORITES, JSON.stringify(localStorageFavData));

        return localStorageFavData.players;
      }

      return [];
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message ?? SERVER_ERROR_MESSAGE);
    }
  },
);
