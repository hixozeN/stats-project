import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { favoriteActions } from 'entities/Favorites/index';
import { openIdDTOConverter } from '../../dto/openIdDTOConverter';

interface AuthUserProps {
  variant: 'registration' | 'login',
  email: string;
  password: string;
  username?: string;
}

export const authUserService = createAsyncThunk<User, AuthUserProps, ThunkConfig<string>>(
  'AUTH_FORM',
  async (authDataProps, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, dispatch, extra } = thunkAPI;
    const {
      variant, email, password, username = '',
    } = authDataProps;

    try {
      // отправляем пост запрос через аксиос с собранными данными
      const response = await extra.royalApi.post<{ userData: User }>(
        `/auth/${variant}`,
        variant === 'login'
          ? { email, password }
          : { email, password, username },
      );

      // прокидываем ошибку, если данных нет
      if (!response.data) return rejectWithValue(SERVER_ERROR_MESSAGE);

      // записываем в стейт полученные данные
      dispatch(userActions.setAuthData(response.data.userData));
      // меняем состояние логина
      dispatch(userActions.setLoggedIn(true));

      const convertedUserData = openIdDTOConverter(response.data.userData);

      // записываем данные в локалсторейдж
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(convertedUserData));

      // записываем избранное
      dispatch(favoriteActions.setFavoritesPlayers(response.data?.userData?.subscribes ?? []));
      dispatch(favoriteActions.setFavoritesClans(response.data?.userData?.clanSubscribes ?? []));

      // возвращаем полученные данные
      return response.data.userData;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || SERVER_ERROR_MESSAGE);
    }
  },
);
