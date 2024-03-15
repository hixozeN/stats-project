import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { userDataActions } from '../../../model/slice/userDataSlice';
import { LestaTankStats } from '../../types/tanks';
import { TUserData } from '../../types/users';

interface ThunkProps {
  id: number | number[],
  lestaAccessToken?: string,
}

interface ReturnData {
  userData: TUserData;
  userTanks: LestaTankStats[];
}

export const fetchUserDataByLestaId = createAsyncThunk<ReturnData, ThunkProps, ThunkConfig<string>>(
  'LESTA_USER_DATA',
  async (ThunkProps, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, dispatch, extra } = thunkAPI;
    const {
      id = 1, lestaAccessToken = '',
    } = ThunkProps;
    const serverError = 'Проблема соединения. Попробуйте позже.';
    // отправка запроса
    try {
      // отправляем пост запрос через аксиос с собранными данными
      const endPoint = lestaAccessToken
        ? `/user/v2/?id=${id}&accessToken=${lestaAccessToken}`
        : `/user/v2/?id=${id}`;
      const response = await extra.royalApi.get<ReturnData>(endPoint);

      // прокидываем ошибку, если данных нет
      if (!response.data) return rejectWithValue(serverError);

      // записываем в стейт персональные данные
      dispatch(userDataActions.setPersonalUserData({
        ...response?.data?.userData?.personal,
      }));

      // записываем рейтинговые данные
      dispatch(userDataActions.setRatingData({ ...response?.data?.userData?.rating }));
      dispatch(userDataActions.setRatingValues({ ...response?.data?.userData?.ratingValues }));

      // записываем статистику игрока
      dispatch(userDataActions.setUserStats({ ...response?.data?.userData?.statistics }));

      // записываем данные о клане игрока
      if (response?.data?.userData?.clan) {
        dispatch(userDataActions.setUserClan({ ...response?.data?.userData?.clan }));
      }

      // если был передан, записываем приватные данные аккаунта
      if (lestaAccessToken) {
        dispatch(userDataActions.setPrivateUserData({
          ...response?.data?.userData?.private,
        }));
      }
      // возвращаем полученные данные
      return response.data;
    } catch (e) {
      if (e?.response?.status === 404) {
        dispatch(userDataActions.setNotFoundStatus(true));
      }
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || serverError);
    }
  },
);
