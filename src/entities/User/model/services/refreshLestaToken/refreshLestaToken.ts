import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { LOCAL_STORAGE_LESTA } from 'shared/consts/localstorage';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';

interface RefreshTokenData {
  access_token: string;
  account_id: number;
  expires_at: number;
}

export const refreshLestaToken = createAsyncThunk<RefreshTokenData, void, ThunkConfig<string | number>>(
  'REFRESH_LESTA_TOKEN',
  async (ThunkProps, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, extra } = thunkAPI;
    const access_token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LESTA.TOKEN));

    if (!access_token) return rejectWithValue('');

    // отправка запроса
    try {
      // если есть ключ в LS, значит пользователь был авторизован, проверим токен
      const newToken = await extra.royalApi.post<RefreshTokenData>(
        '/auth/refresh/lesta',
        { access_token },
      );

      // возвращаем полученные данные
      return newToken.data;
    } catch (e) {
      if (e?.response?.code === 407) {
        await extra.royalApi.post('/auth/logout', { withCredentials: true });
      }
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.code || SERVER_ERROR_MESSAGE);
    }
  },
);
