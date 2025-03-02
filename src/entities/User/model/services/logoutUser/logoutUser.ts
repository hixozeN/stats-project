import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { favoriteActions } from 'entities/Favorites';

export const logoutUser = createAsyncThunk<void, void, ThunkConfig<string>>(
  'CURRENT_USER_LOGOUT',
  async (_, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, extra, dispatch } = thunkAPI;
    // отправка запроса
    try {
      const res = await extra.royalApi.post('/auth/logout', { withCredentials: true });
      extra.navigate(RoutePath.main);

      dispatch(favoriteActions.resetStateToInitial());

      // возвращаем полученные данные
      return res.data;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || SERVER_ERROR_MESSAGE);
    }
  },
);
