import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { ILeaderboardItem } from 'features/playersLeaderboard/model/types/ILeaderboardItem';

type SortValue = 'battles' | 'damage' | 'winrate' | 'wn8';

interface Props {
  battles: number;
  limit: number;
  sortBy: SortValue;
}

export const getLeaderBoard = createAsyncThunk<ILeaderboardItem[], Props, ThunkConfig<string>>(
  'GET_LEADER_BOARD',
  async (props, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, extra } = thunkAPI;
    const { battles, sortBy, limit } = props;

    // отправка запроса
    try {
      // если есть ключ в LS, значит пользователь был авторизован, проверим токен
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
