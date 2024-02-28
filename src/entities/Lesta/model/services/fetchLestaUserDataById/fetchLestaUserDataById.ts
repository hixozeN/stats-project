import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { lestaActions } from '../../slice/lestaSlice';
import { LestaUser, LestaUserSession } from '../../types/users';

interface ThunkProps {
  id: number | number[],
  lestaAccessToken?: string,
  shouldRefreshSession?: boolean,
}

interface Session {
  session: LestaUserSession;
}

export const fetchLestaUserDataById = createAsyncThunk<LestaUser, ThunkProps, ThunkConfig<string>>(
  'lesta/fetchingLestaUserData',
  async (ThunkProps, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, dispatch, extra } = thunkAPI;
    const {
      id = 1, lestaAccessToken = '', shouldRefreshSession = false,
    } = ThunkProps;
    const serverError = 'Проблема соединения. Попробуйте позже.';
    // отправка запроса
    try {
      // обновляем сессию игрока
      if (shouldRefreshSession) {
        await extra.royalApi.patch(
          'http://localhost:3030/sessions/update',
          {},
          { withCredentials: true },
        );
      }

      // отправляем пост запрос через аксиос с собранными данными
      const response = await extra.royalApi.post<LestaUser>('/user', {
        id,
        ...(lestaAccessToken && { accessToken: lestaAccessToken }), // если есть токен, то передаем и его
      });

      // прокидываем ошибку, если данных нет
      if (!response.data) return rejectWithValue(serverError);

      const sessions:LestaUserSession[] = [];

      if (response.data.sessions) {
        const promises = response.data.sessions.map(async (session) => {
          const sessionData = await extra.royalApi.get<Session>(`/sessions/${session}`);
          return sessionData;
        });

        // Ожидаем выполнения всех запросов
        const sessionsRes = await Promise.all(promises);

        sessionsRes.forEach((session) => {
          sessions.push({
            id: session.data.session._id,
            ...session.data.session,
          });
        });
      }

      // записываем в стейт полученные данные
      dispatch(lestaActions.setUserData({
        ...response.data,
        sessions,
      }));

      if (response.data.sessions) {
        const lastUserSession = response.data.sessions[response.data.sessions.length - 1];

        const userSession = await extra.royalApi.get<Session>(
          `/sessions/${lastUserSession}`,
        );

        if (userSession.data.session) {
          dispatch(lestaActions.setLastSession({
            id: userSession.data.session._id,
            ...userSession.data.session,
          }));
        }
      }

      // возвращаем полученные данные
      return response.data;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || serverError);
    }
  },
);
