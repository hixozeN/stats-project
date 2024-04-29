import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { userDataActions } from '../../../model/slice/userDataSlice';
import { TUserTanks } from '../../types/tanks';
import { TUserData } from '../../types/users';
import { userTanksActions } from '../../slice/lestaTanksSlice';

export interface ThunkProps {
  id: number | number[],
  lestaAccessToken?: string,
}

export interface ReturnData {
  userData: TUserData;
  userTanks: TUserTanks[];
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

      // записываем данные о танках игрока
      if (response?.data?.userTanks) {
        dispatch(userTanksActions.setUserTanks([...response.data.userTanks]));
        // dispatch(filterActions.setFilterData([...response.data.userTanks]));
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
