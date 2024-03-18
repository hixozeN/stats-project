import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { userDataActions } from 'entities/Lesta/model/slice/userDataSlice';
import { LestaUserSession } from '../../types/users';

export const createLestaUserSession = createAsyncThunk<
  LestaUserSession[],
  void,
  ThunkConfig<string>
  >('LESTA_SESSION_CREATE', async (_, thunkAPI) => {
  // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, dispatch, extra } = thunkAPI;

    const serverError = 'Проблема соединения. Попробуйте позже.';
    // отправка запроса
    try {
      const response = await extra.royalApi.patch<LestaUserSession[]>(
        '/sessions/update',
        {},
        { withCredentials: true },
      );

      if (!response.data) return rejectWithValue(serverError);

      dispatch(userDataActions.setUserSessions(response.data));

      // возвращаем полученные данные
      return response.data;
    } catch (e) {
    // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || serverError);
    }
  });
