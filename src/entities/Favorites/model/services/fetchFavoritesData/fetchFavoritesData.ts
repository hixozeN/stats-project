import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { favoritesPlayersActions } from 'entities/Favorites/model/slice/favoritesPlayersSlice';
import { IFavoritesData } from 'entities/Favorites/model/types';

export interface ThunkProps {
  account_id: number;
}

export interface ResponseData {
  lestaData: { account_id: number },
  username: string,
  _id: string,
}

export const fetchFavoritesData = createAsyncThunk<IFavoritesData[], ThunkProps, ThunkConfig<string>>(
  'FAVORITES',
  async (ThunkProps, thunkAPI) => {
    const { rejectWithValue, dispatch, extra } = thunkAPI;
    const { account_id } = ThunkProps;
    const serverError = 'Проблема соединения. Попробуйте позже.';
    // отправка запроса
    try {
    // отправляем put запрос через аксиос с собранными данными
      const response: any = await extra.royalApi.put<ResponseData>('/user/subscribe', {
        account_id,
      });

      // прокидываем ошибку, если данных нет
      if (!response.data) return rejectWithValue(serverError);

      const extractedData: IFavoritesData[] = response.data.subscrubes.map((item: ResponseData) => ({
        account_id: item.lestaData.account_id,
        name: item.username,
      }));
      dispatch(
        favoritesPlayersActions.setFavoritesPlayers(extractedData),
      );

      // возвращаем полученные данные
      return response.extractedData;
    } catch (e) {
    // возвращаем ошибку с бэка
      return rejectWithValue(e?.response?.data?.message ?? serverError);
    }
  },
);
