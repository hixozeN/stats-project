import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { lestaActions } from '../../slice/lestaSlice';
import { LestaUser, LestaUserLastSession } from '../../types/users';

interface ThunkProps {
  id: number | number[],
  accessToken?: string,
}

export const fetchLestaUserDataById = createAsyncThunk<LestaUser, ThunkProps, ThunkConfig<string>>(
  'lesta/fetchingUserData',
  async (ThunkProps, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, dispatch, extra } = thunkAPI;
    const serverError = 'Проблема соединения. Попробуйте позже.';
    // отправка запроса
    try {
      // отправляем пост запрос через аксиос с собранными данными
      const response = await axios.post<LestaUser>('http://localhost:3030/user', { id: ThunkProps.id });

      // прокидываем ошибку, если данных нет
      if (!response.data) return rejectWithValue(serverError);

      // записываем в стейт полученные данные
      dispatch(lestaActions.setUserData(response.data));

      const lastUserSession = response.data.sessions[response.data.sessions.length - 1];

      const userSession = await axios.get<{ session: LestaUserLastSession }>(
        `http://localhost:3030/sessions/${lastUserSession}`,
      );

      if (userSession.data.session) {
        dispatch(lestaActions.setLastSession(userSession.data.session));
      }

      // возвращаем полученные данные
      return response.data;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || serverError);
    }
  },
);
