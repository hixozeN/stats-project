import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/index';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { LOCAL_STORAGE_LESTA, LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { User, UserOpenID, userActions } from 'entities/User';
import { openIdDTOConverter } from '../../dto/openIdDTOConverter';

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

export const authByLestaOpenID = createAsyncThunk<User, ThunkProps, ThunkConfig<string>>(
  'AUTH_LESTA_OPEN_ID',
  async (ThunkProps, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, dispatch, extra } = thunkAPI;
    // отправка запроса
    try {
      // авторизовываем пользователя по OpenID данным
      const currentUserData = await extra.royalApi.post<AxiosResponse>(
        '/auth/lesta',
        ThunkProps,
      );

      // прогоняем ответ через DTO converter
      const convertedUserData = openIdDTOConverter(currentUserData.data.userData);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(convertedUserData));
      localStorage.setItem(LOCAL_STORAGE_LESTA.TOKEN, JSON.stringify(ThunkProps.access_token));
      localStorage
        .setItem(LOCAL_STORAGE_LESTA.EXPIRES_AT, JSON.stringify(ThunkProps.expires_at));

      // переключаем стейт логина и записываем актуальные данные пользователя
      // dispatch(userActions.setLoggedIn(true));
      // dispatch(userActions.setAuthData(currentUserData.data.userData));

      // возвращаем полученные данные
      return currentUserData.data.userData;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || SERVER_ERROR_MESSAGE);
    }
  },
);
