import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { LOCAL_STORAGE_FAVORITES } from 'shared/consts/localstorage';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import {
  DeleteClanFromFavoritesResponse,
  FavoritesData,
} from 'shared/api/model/types/user/favorites';
import { FavoriteClan } from '../../types';

export interface ThunkProps {
  clan_id: FavoriteClan['clan_id'];
}

export const removeClanFromFavorites = createAsyncThunk<FavoritesData['clans'], ThunkProps, ThunkConfig<string>>(
  'REMOVE_CLAN_FROM_FAVORITES',
  async (props, thunkAPI) => {
    const {
      rejectWithValue, extra, getState,
    } = thunkAPI;
    const { clan_id } = props;

    try {
      const isLoggedIn = !!getState().user?.isLoggedIn;

      if (isLoggedIn) {
        const favData = await extra.royalApi
          .delete<DeleteClanFromFavoritesResponse>(`/user/subscribe/clan/${clan_id}`)
          .then((res) => res.data?.items);

        return favData;
      }

      if (LOCAL_STORAGE_FAVORITES in localStorage) {
        const localStorageFavData: FavoritesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITES));
        localStorageFavData.clans = localStorageFavData.clans.filter((p) => p.clan_id !== clan_id);
        localStorage.setItem(LOCAL_STORAGE_FAVORITES, JSON.stringify(localStorageFavData));

        return localStorageFavData.clans;
      }

      return [];
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message ?? SERVER_ERROR_MESSAGE);
    }
  },
);
