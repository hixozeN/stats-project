import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User/index';
import { LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { ThunkConfig } from 'app/providers/StoreProvider/index';

interface LoginByLestaProps {
  status: string;
  access_token: string;
  nickname: string;
  account_id: number;
  expires_at: Date;
}

export const loginByLesta = createAsyncThunk<User, LoginByLestaProps, ThunkConfig<string>>(
  'users/loginByLesta',
  async (lestaData, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, dispatch, extra } = thunkAPI;
    const serverError = 'Проблема соединения. Попробуйте позже.';
    // отправка запроса
    try {
      // отправляем пост запрос через аксиос с собранными данными
      const response = await extra.royalApi.post<User>(
        '/lesta',
        lestaData,
        { withCredentials: true },
      );

      // прокидываем ошибку, если данных нет
      if (!response.data) return rejectWithValue(serverError);

      // записываем в стейт полученные данные
      dispatch(userActions.setAuthData(response.data));
      // меняем состояние логина
      dispatch(userActions.setLoggedIn(true));

      // записываем данные в локалсторейдж
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(response.data));

      // возвращаем полученные данные
      return response.data;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || serverError);
    }
  },
);
