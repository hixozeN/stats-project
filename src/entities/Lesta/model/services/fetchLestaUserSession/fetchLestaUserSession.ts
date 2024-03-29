import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { userSessionActions } from '../../slice/userSessionSlice';
import { TUserSession } from '../../types/users';

interface ThunkProps {
  sessionId: string;
  shouldRefreshSession?: boolean;
}

export const fetchLestaUserSessionById = createAsyncThunk<
  TUserSession,
  ThunkProps,
  ThunkConfig<string>
  >('LESTA_USER_SESSION', async (ThunkProps, thunkAPI) => {
  // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, dispatch, extra } = thunkAPI;
    const {
      sessionId,
      shouldRefreshSession = false,
    } = ThunkProps;
    const serverError = 'Проблема соединения. Попробуйте позже.';
    // отправка запроса
    try {
    // обновляем сессию игрока
      if (shouldRefreshSession) {
        await extra.royalApi.get(`http://localhost:3030/sessions/v2/${sessionId}`);
      }

      // отправляем пост запрос через аксиос с собранными данными
      const response = await extra.royalApi.get<TUserSession>(`/sessions/v2/${sessionId}`);

      // прокидываем ошибку, если данных нет
      if (!response.data) return rejectWithValue(serverError);

      dispatch(userSessionActions.setSessionDelta({ ...response.data.delta }));
      dispatch(userSessionActions.setSessionStatistics({ ...response.data.statistics }));
      dispatch(userSessionActions.setSessionTanks(response.data.tanks));

      // возвращаем полученные данные
      return response.data;
    } catch (e) {
    // возвращаем ошибку с бэка
      return rejectWithValue(e);
    }
  });
