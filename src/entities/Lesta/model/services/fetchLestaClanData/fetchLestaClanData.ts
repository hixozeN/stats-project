import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { generateUserIdList } from 'pages/TeamPage/lib/generateUserIdList';
import { clanActions } from '../../slice/lestaClanSlice';
import { LestaClan, LestaClanPlayer } from '../../types/clans';

interface ThunkProps {
  id: string;
}

type AxiosLestaClanPlayer = {
  players: LestaClanPlayer[];
};

export const fetchLestaClanData = createAsyncThunk<LestaClan, ThunkProps, ThunkConfig<string>>(
  'LESTA_CLAN_DATA',
  async (ThunkProps, thunkAPI) => {
    // деструктурируем нужные данные из thunkAPI
    const { rejectWithValue, dispatch } = thunkAPI;
    const serverError = 'Проблема соединения. Попробуйте позже.';
    // отправка запроса
    try {
      // отправляем пост запрос через аксиос с собранными данными
      const clanDataResponse = await axios.post<LestaClan>('http://192.168.3.81:3030/clans', {
        clan_id: ThunkProps.id,
      });
      // прокидываем ошибку, если данных нет
      if (!clanDataResponse.data) return rejectWithValue(serverError);

      const idUserList = generateUserIdList(clanDataResponse.data.members);

      // запрос к апи на получение списка юзеров
      const clanPlayers = await axios.post<AxiosLestaClanPlayer>('http://192.168.3.81:3030/user', {
        id: idUserList,
      });

      const clanData = {
        ...clanDataResponse.data,
        players: clanPlayers.data.players,
      };

      // записываем в стейт полученные данные
      dispatch(clanActions.setClanData(clanData));

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
