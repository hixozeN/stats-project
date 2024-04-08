import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { User } from '../../types/user';

interface RefreshTokenData {
  access_token: string;
  account_id: number;
  expires_at: number;
}

export const checkUserAuth = createAsyncThunk<User, void, ThunkConfig<string>>(
  'CHECK_USER_AUTH',
  async (ThunkProps, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, extra } = thunkAPI;
    const user = !!localStorage.getItem(LOCAL_STORAGE_USER_KEY);

    if (!user) return rejectWithValue('');

    // отправка запроса
    try {
      // если есть ключ в LS, значит пользователь был авторизован, проверим токен
      const currentUserData = await extra.royalApi.get<User>('/user/me');

      const lestaAccessToken = currentUserData?.data?.lestaData?.access_token || null;

      if (lestaAccessToken && !IS_DEV) {
        const newToken = await extra.royalApi.post<RefreshTokenData>(
          '/auth/refresh/lesta',
          { access_token: lestaAccessToken },
        );

        currentUserData.data.lestaData.access_token = newToken.data.access_token;
        currentUserData.data.lestaData.expires_at = newToken.data.expires_at;
      }

      // возвращаем полученные данные
      return currentUserData.data;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || SERVER_ERROR_MESSAGE);
    }
  },
);
