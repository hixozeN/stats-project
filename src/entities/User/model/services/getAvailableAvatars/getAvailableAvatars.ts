import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { AvatarFullData } from '../../types/user';

export const getAvailableAvatars = createAsyncThunk<AvatarFullData, void, ThunkConfig<string>>(
  'GET_AVAILABLE_AVATARS',
  async (ThunkProps, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, extra } = thunkAPI;

    // отправка запроса
    try {
      const avatars = await extra.royalApi.get<AvatarFullData>('/avatars/available');

      // возвращаем полученные данные
      return avatars.data;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || SERVER_ERROR_MESSAGE);
    }
  },
);
