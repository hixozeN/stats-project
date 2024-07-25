import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { ILeaderboardItem } from '../types/ILeaderboardItem';
import {
  PlayersLeaderboardParams,
} from '../types/playerLeaderboard';

export const getLeaderBoard = createAsyncThunk<ILeaderboardItem[], PlayersLeaderboardParams, ThunkConfig<string>>(
  'GET_LEADER_BOARD',
  async (props, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, extra } = thunkAPI;
    const { battles, sortBy, limit } = props;

    // отправка запроса
    try {
      const leaderboard = await extra.royalApi.get<ILeaderboardItem[]>(
        `/rating/users/?battles=${battles}&limit=${limit}&sortBy=${sortBy}`,
      );

      // возвращаем полученные данные
      return leaderboard.data;
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || SERVER_ERROR_MESSAGE);
    }
  },
);
