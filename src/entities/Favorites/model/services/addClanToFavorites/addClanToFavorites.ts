import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { LOCAL_STORAGE_FAVORITES } from 'shared/consts/localstorage';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { AddClanToFavoritesResponse, FavoritesData } from 'shared/api/model/types/user/favorites';
import { TFunction } from 'i18next';
import { FavoriteClan } from '../../types';

export interface ThunkProps {
  clanData: FavoriteClan;
  t: TFunction;
}

export const addClanToFavorites = createAsyncThunk<FavoritesData['clans'], ThunkProps, ThunkConfig<string>>(
  'ADD_CLAN_TO_FAVORITES',
  async (props, thunkAPI) => {
    const {
      rejectWithValue, extra, getState,
    } = thunkAPI;
    const { clanData, t } = props;

    try {
      const isLoggedIn = !!getState().user?.isLoggedIn;

      if (isLoggedIn) {
        const favData = await extra.royalApi
          .put<AddClanToFavoritesResponse>('/user/subscribe/clan', clanData)
          .then((res) => res.data?.items);

        return favData;
      }

      if (LOCAL_STORAGE_FAVORITES in localStorage) {
        const localStorageFavData: FavoritesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITES));

        // Лимит в 50 кланов
        if (localStorageFavData.clans.length >= 50) {
          extra.toastWithError(t('errors.favorites.clansLimitReached'));
          return rejectWithValue(t('errors.favorites.clansLimitReached'));
        }

        localStorageFavData.clans.push(clanData);
        localStorage.setItem(LOCAL_STORAGE_FAVORITES, JSON.stringify(localStorageFavData));

        return localStorageFavData.clans;
      }

      localStorage.setItem(LOCAL_STORAGE_FAVORITES, JSON.stringify({ players: [], clans: [clanData] }));

      return [clanData];
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message ?? SERVER_ERROR_MESSAGE);
    }
  },
);
