import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { User } from '../../types/user';

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

      // возвращаем полученные данные
      return currentUserData.data;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || SERVER_ERROR_MESSAGE);
    }
  },
);
