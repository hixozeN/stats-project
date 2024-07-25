import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { clanActions } from '../../slice/lestaClanSlice';
import { LestaClan } from '../../types/clans';

interface ThunkProps {
  id: string;
}

export const fetchLestaClanData = createAsyncThunk<LestaClan, ThunkProps, ThunkConfig<string>>(
  'LESTA_CLAN_DATA',
  async (ThunkProps, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, dispatch, extra } = thunkAPI;
    const serverError = 'Проблема соединения. Попробуйте позже.';
    // отправка запроса
    try {
      // отправляем пост запрос через аксиос с собранными данными
      const clanDataResponse = await extra.royalApi.get<LestaClan>(
        `/clans/?clan_id=${ThunkProps.id}`,
      );
      // прокидываем ошибку, если данных нет
      if (!clanDataResponse.data) return rejectWithValue(serverError);

      // возвращаем полученные данные
      return clanDataResponse.data;
    } catch (e) {
      if (e?.response?.status === 404) {
        dispatch(clanActions.setNotFound(true));
      }
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || serverError);
    }
  },
);
