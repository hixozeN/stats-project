import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { LOCAL_STORAGE_FAVORITES, LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { AxiosResponse } from 'axios';
import { favoriteActions, Favorites } from 'entities/Favorites';
import { User } from '../../types/user';

export const checkUserAuth = createAsyncThunk<User, void, ThunkConfig<string>>(
  'CHECK_USER_AUTH',
  async (ThunkProps, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, extra, dispatch } = thunkAPI;

    // подготовка стейта избранных при инициализации
    if (LOCAL_STORAGE_FAVORITES in localStorage) {
      const favorites: Favorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITES));

      dispatch(favoriteActions.setFavoritesPlayers(favorites.players ?? []));
      dispatch(favoriteActions.setFavoritesClans(favorites.clans ?? []));
    }

    const user = !!localStorage.getItem(LOCAL_STORAGE_USER_KEY);

    if (!user) return rejectWithValue('');

    // отправка запроса
    try {
      // если есть ключ в LS, значит пользователь был авторизован, проверим токен
      const currentUserData: AxiosResponse<User> = await extra.royalApi.get<User>('/user/me');

      // Убрано, т.к. лестовские токены работают нестабильно, а персональная информация не в приоритете
      // const lestaAccessToken = currentUserData?.data?.lestaData?.access_token || null;

      // if (lestaAccessToken) {
      //   const newToken = await extra.royalApi.post<RefreshTokenData>(
      //     '/auth/refresh/lesta',
      //     { access_token: lestaAccessToken },
      //   );
      //
      //   currentUserData.data.lestaData.access_token = newToken.data.access_token;
      //   currentUserData.data.lestaData.expires_at = newToken.data.expires_at;
      // }

      dispatch(favoriteActions.setFavoritesPlayers(currentUserData.data.subscribes ?? []));
      dispatch(favoriteActions.setFavoritesClans(currentUserData.data.clanSubscribes ?? []));

      // возвращаем полученные данные
      return currentUserData.data;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || SERVER_ERROR_MESSAGE);
    }
  },
);
