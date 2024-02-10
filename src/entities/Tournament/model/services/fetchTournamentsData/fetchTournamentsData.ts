import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
  filterDataOnLadders,
  filterDataOnTournaments,
  filterFinishedTournaments,
} from '../../../lib/filterRecievedData';
import { tournamentActions } from '../../slice/tournamentSlice';
import { TournamentData } from '../../types/tournament';

export const fetchTournamentsData = createAsyncThunk<
  TournamentData[],
  void,
  ThunkConfig<string>
>('tournaments/fetchTournamentsData', async (_, thunkAPI) => {
  // деструктурируем нужные данные из thunkAPI
  const { rejectWithValue, dispatch, extra } = thunkAPI;
  const serverError = 'Проблема соединения. Попробуйте позже.';
  // отправка запроса
  try {
    // отправляем пост запрос через аксиос с собранными данными
    const response = await extra.api.get<TournamentData[]>('/tournaments');

    // прокидываем ошибку, если данных нет
    if (!response.data) return rejectWithValue(serverError);

    // сортируем данные
    const ladders = filterDataOnLadders(response.data);
    const tournaments = filterDataOnTournaments(response.data);
    const finished = filterFinishedTournaments(response.data);

    // записываем в стейт полученные данные
    dispatch(tournamentActions.addTournaments(tournaments));
    dispatch(tournamentActions.addLadders(ladders));
    dispatch(tournamentActions.addFinishedTournaments(finished));

    // возвращаем полученные данные
    return response.data;
  } catch (e) {
    // возвращаем ошибку с бэка
    return rejectWithValue(e?.response?.data?.message || serverError);
  }
});
