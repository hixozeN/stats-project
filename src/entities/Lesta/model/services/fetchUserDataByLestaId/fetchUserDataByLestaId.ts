import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { userDataActions } from 'entities/Lesta/model/slice/userDataSlice';
import { LestaPrivateUserData, LestaUser } from '../../types/users';

interface ThunkProps {
  id: number | number[],
  lestaAccessToken?: string,
}

interface AxiosResponse {
  userData: {
    private: LestaPrivateUserData;
    personal: LestaUser;
    statistics: any;
    rating: any;
    ratingValues: {
      ratingValue: number;
      calibration_battles_left: number;
    },
    clan: any;
  },
  userTanks: any[];
}

export const fetchUserDataByLestaId = createAsyncThunk<AxiosResponse, ThunkProps, ThunkConfig<string>>(
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
      const response = await extra.royalApi.get<AxiosResponse>(endPoint);

      // прокидываем ошибку, если данных нет
      if (!response.data) return rejectWithValue(serverError);

      // записываем в стейт полученные данные
      dispatch(userDataActions.setPersonalUserData({
        ...response.data.userData.personal,
      }));

      if (lestaAccessToken) {
        dispatch(userDataActions.setPrivateUserData({
          ...response.data.userData.private,
        }));
      }
      // возвращаем полученные данные
      return response.data;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || serverError);
    }
  },
);
