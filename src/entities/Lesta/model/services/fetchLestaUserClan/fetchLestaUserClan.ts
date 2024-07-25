import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
  SERVER_ERROR_MESSAGE,
} from 'shared/consts/global';
import { Clan } from '../../types/clans';

export interface ThunkProps {
  id: number;
}

export interface ResponseData {
  clan: Clan;
}

export const fetchLestaUserClan = createAsyncThunk<Clan, ThunkProps, ThunkConfig<string>>(
  'LESTA_USER_CLAN',
  async (ThunkProps, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, extra } = thunkAPI;
    const {
      id = 1,
    } = ThunkProps;
    try {
      const clanData = await extra.royalApi.get<ResponseData>(`/user/clan/?id=${id}`);

      // прокидываем ошибку, если данных нет
      if (!clanData.data || clanData instanceof Error) throw clanData ?? SERVER_ERROR_MESSAGE;

      // возвращаем полученные данные
      return clanData.data.clan;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || SERVER_ERROR_MESSAGE);
    }
  },
);
