import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
  filterMyTeams,
  filterOpenedTeams,
  filterTopTeams,
} from '../../../lib/filterTeamsData';
import { teamActions } from '../../slice/teamSlice';
import { TeamData } from '../../types/team';

export const fetchTeamsData = createAsyncThunk<
  TeamData[],
  void,
  ThunkConfig<string>
>('teams/fetchTeamsData', async (_, thunkAPI) => {
  // деструктурируем нужные данные из thunkAPI
  const { rejectWithValue, dispatch, extra } = thunkAPI;
  const serverError = 'Проблема соединения. Попробуйте позже.';
  // отправка запроса
  try {
    // отправляем пост запрос через аксиос с собранными данными
    const response = await extra.api.get<TeamData[]>('/teams');

    // прокидываем ошибку, если данных нет
    if (!response.data) return rejectWithValue(serverError);

    // сортируем данные
    const myTeams = filterMyTeams(response.data);
    const openedTeams = filterOpenedTeams(response.data);
    const topTeams = filterTopTeams(response.data);

    // записываем в стейт полученные данные
    dispatch(teamActions.addMyTeams(myTeams));
    dispatch(teamActions.addOpenedTeams(openedTeams));
    dispatch(teamActions.addTopTeams(topTeams));

    // возвращаем полученные данные
    return response.data;
  } catch (e) {
    // возвращаем ошибку с бэка
    return rejectWithValue(e?.response?.data?.message || serverError);
  }
});
