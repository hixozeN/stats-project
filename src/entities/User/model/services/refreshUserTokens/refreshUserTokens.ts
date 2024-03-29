import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { AxiosRequestConfig } from 'axios';
import { User } from '../../types/user';
import { userActions } from '../../slice/userSlice';

interface ThunkProps {
  originalRequest: AxiosRequestConfig;
}

export const refreshUserTokens = createAsyncThunk<User, ThunkProps, ThunkConfig<string>>(
  'REFRESH_USER_TOKENS',
  async (ThunkProps, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, dispatch, extra } = thunkAPI;
    const { originalRequest } = ThunkProps;
    // отправка запроса
    try {
      const res = await extra.royalApi.get('/auth/refresh', { withCredentials: true });
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.userData));
      originalRequest.headers.Authorization = `Bearer ${res.data.userData.accessToken}`;
      return res.data;
    } catch (e) {
      dispatch(userActions.logout());
      dispatch(userActions.setError('Ошибка авторизации'));
      return rejectWithValue(e?.response?.data?.message || SERVER_ERROR_MESSAGE);
    }
  },
);
