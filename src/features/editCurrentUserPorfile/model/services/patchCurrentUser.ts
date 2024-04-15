import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { User } from 'entities/User';

interface PatchData {
  email?: string;
  password?: string;
  discord?: string;
  telegram?: string;
  vk?: string;
  youtube?: string;
}

export const patchCurrentUser = createAsyncThunk<User, PatchData, ThunkConfig<string>>(
  'PATCH_CURRENT_USER',
  async (PatchData, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, extra } = thunkAPI;

    // отправка запроса
    try {
      // если есть ключ в LS, значит пользователь был авторизован, проверим токен
      const currentUserData = await extra.royalApi.patch<User>('/user/me', PatchData);

      extra.toastSuccess('Данные обновлены!');

      // возвращаем полученные данные
      return currentUserData.data;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || SERVER_ERROR_MESSAGE);
    }
  },
);
