import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { openIdDTO } from 'entities/User/model/dto/openIdDTO';
import { User, UserOpenID } from '../../types/user';
import { userActions } from '../../slice/userSlice';

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

      // прогоняем ответ через DTO
      const userDTO = openIdDTO(currentUserData.data.userData);

      // переключаем стейт логина и записываем актуальные данные пользователя
      dispatch(userActions.setLoggedIn(true));
      dispatch(userActions.setAuthData(userDTO));

      // возвращаем полученные данные
      return userDTO;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || SERVER_ERROR_MESSAGE);
    }
  },
);
