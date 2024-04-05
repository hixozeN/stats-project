import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/index';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { LOCAL_STORAGE_LESTA, LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { User, userActions, UserOpenID } from 'entities/User';

interface ThunkProps {
  status: string;
  access_token: string;
  nickname: string;
  account_id: number;
  expires_at: number;
}

interface AxiosResponse {
  userData: UserOpenID,
}

export const connectLestaOpenId = createAsyncThunk<User, ThunkProps, ThunkConfig<string>>(
  'CONNECT_LESTA_OPEN_ID',
  async (ThunkProps, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, extra, dispatch } = thunkAPI;
    // отправка запроса
    try {
      // отправляем полученные данные
      const res = await extra.royalApi.post<AxiosResponse>(
        '/auth/lesta/connect',
        ThunkProps,
        { withCredentials: true },
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { refreshToken, ...data } = res.data.userData;
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(data));
      localStorage.setItem(LOCAL_STORAGE_LESTA.TOKEN, JSON.stringify(ThunkProps.access_token));
      localStorage
        .setItem(LOCAL_STORAGE_LESTA.EXPIRES_AT, JSON.stringify(ThunkProps.expires_at));

      dispatch(userActions.setAuthData(data));

      // возвращаем полученные данные
      return data;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || SERVER_ERROR_MESSAGE);
    }
  },
);
