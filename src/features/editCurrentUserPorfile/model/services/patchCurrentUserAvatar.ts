import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';

interface PatchData {
  avatarId: string;
}

interface AvatarLink {
  avatar: string;
}

export const patchCurrentUserAvatar = createAsyncThunk<AvatarLink, PatchData, ThunkConfig<string>>(
  'PATCH_CURRENT_USER_AVATAR',
  async (PatchData, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, extra } = thunkAPI;

    // отправка запроса
    try {
      // если есть ключ в LS, значит пользователь был авторизован, проверим токен
      const newAvatar = await extra.royalApi.patch<AvatarLink>('/user/me/avatar', PatchData);

      // возвращаем полученные данные
      return newAvatar.data;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || SERVER_ERROR_MESSAGE);
    }
  },
);
