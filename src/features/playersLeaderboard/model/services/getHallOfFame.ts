import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SERVER_ERROR_MESSAGE } from 'shared/consts/global';
import { ILeaderboardItem } from 'features/playersLeaderboard/model/types/ILeaderboardItem';

interface ReturnData {
  wn8: ILeaderboardItem[];
  damage: ILeaderboardItem[];
  winrate: ILeaderboardItem[];
}

export const getHallOfFame = createAsyncThunk<ReturnData, void, ThunkConfig<string>>(
  'GET_HALL_OF_FAME',
  async (props, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, extra } = thunkAPI;

    // отправка запроса
    try {
      // если есть ключ в LS, значит пользователь был авторизован, проверим токен
      const [resWithWn8, resWithDamage, resWithWinrate] = await Promise.all([
        extra.royalApi.get<ILeaderboardItem[]>(
          '/rating/users/?battles=10000&limit=10&&sortBy=wn8',
        ),
        extra.royalApi.get<ILeaderboardItem[]>(
          '/rating/users/?battles=10000&limit=10&sortBy=damage',
        ),
        extra.royalApi.get<ILeaderboardItem[]>(
          '/rating/users/?battles=10000&limit=10&&sortBy=winrate',
        ),
      ]);
      // const resWithWn8 = await extra.royalApi.get<ILeaderboardItem[]>(
      //   '/rating/users/?battles=10000&limit=10&&sortBy=wn8',
      // );
      // const resWithDamage = await extra.royalApi.get<ILeaderboardItem[]>(
      //   '/rating/users/?battles=10000&limit=10&sortBy=damage',
      // );
      // const resWithWinrate = await extra.royalApi.get<ILeaderboardItem[]>(
      //   '/rating/users/?battles=10000&limit=10&&sortBy=winrate',
      // );

      // возвращаем полученные данные
      return {
        wn8: resWithWn8.data,
        damage: resWithDamage.data,
        winrate: resWithWinrate.data,
      };
    } catch (e) {
      // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message || SERVER_ERROR_MESSAGE);
    }
  },
);
