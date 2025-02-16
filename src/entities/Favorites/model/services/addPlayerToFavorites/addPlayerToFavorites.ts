import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { LOCAL_STORAGE_FAVORITES } from 'shared/consts/localstorage';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { AddPlayerToFavoritesResponse, FavoritesData } from 'shared/api/model/types/user/favorites/index';
import { GetUserDataResponse } from 'entities/Lesta';
import { FavoritesButtonTheme } from 'shared/ui/FavoritesButton/FavoritesButton';
import { FavoritePlayer } from '../../types';

export interface ThunkProps {
  account_id: number;
  type: FavoritesButtonTheme;
}

export const addPlayerToFavorites = createAsyncThunk<FavoritesData['players'], ThunkProps, ThunkConfig<string>>(
  'ADD_PLAYER_TO_FAVORITES',
  async (props, thunkAPI) => {
    const {
      rejectWithValue, extra, getState,
    } = thunkAPI;
    const { account_id, type } = props;

    try {
      const isLoggedIn = !!getState().user?.isLoggedIn;

      if (isLoggedIn) {
        const favData = await extra.royalApi
          .put<AddPlayerToFavoritesResponse>('/user/subscribe', { account_id })
          .then((res) => res.data?.items);

        return favData;
      }

      const newPlayer: FavoritePlayer = {
        lestaData: { account_id: 0 },
        _id: '',
        username: '',
      };

      if (type === 'profile') {
        newPlayer.lestaData.account_id = account_id;
        newPlayer._id = getState().lestaUserData.personal.id;
        newPlayer.username = getState().lestaUserData.personal.username;
      } else {
        const res = await extra.royalApi.get<GetUserDataResponse>(`/user/v2/?id=${account_id}`).then((r) => r.data);

        newPlayer.lestaData.account_id = account_id;
        newPlayer._id = res.userData.personal.id;
        newPlayer.username = res.userData.personal.username;
      }

      if (LOCAL_STORAGE_FAVORITES in localStorage) {
        const localStorageFavData: FavoritesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITES));
        localStorageFavData.players.push(newPlayer);
        localStorage.setItem(LOCAL_STORAGE_FAVORITES, JSON.stringify(localStorageFavData));

        return localStorageFavData.players;
      }

      localStorage.setItem(LOCAL_STORAGE_FAVORITES, JSON.stringify({ players: [newPlayer], clans: [] }));

      return [newPlayer];
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message ?? SERVER_ERROR_MESSAGE);
    }
  },
);
