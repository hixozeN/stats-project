// noinspection ExceptionCaughtLocallyJS

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
  LESTA_TOKEN_INTERCEPTOR_RESPONSE,
  SERVER_ERROR_MESSAGE,
} from 'shared/consts/global';
import { userDataActions } from '../../../model/slice/userDataSlice';
import { TUserTanks } from '../../types/tanks';
import { TUserData } from '../../types/users';
import { userTanksActions } from '../../slice/lestaTanksSlice';

export interface ThunkProps {
  id: number | number[],
  lestaAccessToken?: string,
}

export interface GetUserDataResponse {
  userData: TUserData;
  userTanks: TUserTanks[];
}

export const fetchUserDataByLestaId = createAsyncThunk<GetUserDataResponse, ThunkProps, ThunkConfig<string>>(
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

      const response = await extra.royalApi.get<GetUserDataResponse>(endPoint);

      // прокидываем ошибку, если данных нет
      if (!response.data || response instanceof Error) throw response ?? SERVER_ERROR_MESSAGE;

      // записываем данные о танках игрока
      if (response?.data?.userTanks) {
        dispatch(userTanksActions.setUserTanks([...response.data.userTanks]));
      }

      // возвращаем полученные данные
      return response.data;
    } catch (e) {
      if (e?.response?.status === 404) {
        dispatch(userDataActions.setNotFoundStatus(true));
      }

      if (e?.response?.status === LESTA_TOKEN_INTERCEPTOR_RESPONSE.response.status) {
        return rejectWithValue(LESTA_TOKEN_INTERCEPTOR_RESPONSE.response.data.message);
      }

      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || serverError);
    }
  },
);
