import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/index';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { User, UserOpenID } from 'entities/User';
import { favoriteActions } from 'entities/Favorites';
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
    const { rejectWithValue, extra, dispatch } = thunkAPI;
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

      dispatch(favoriteActions.setFavoritesPlayers(currentUserData.data?.userData?.subscribes ?? []));
      dispatch(favoriteActions.setFavoritesClans(currentUserData.data?.userData?.clanSubscribes ?? []));

      extra.navigate(`/user/${ThunkProps.account_id}`);

      // возвращаем полученные данные
      return currentUserData.data.userData;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || SERVER_ERROR_MESSAGE);
    }
  },
);
