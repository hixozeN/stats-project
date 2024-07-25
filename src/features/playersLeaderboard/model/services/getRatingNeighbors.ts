import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { LESTA_UNAVAILABLE } from 'shared/consts/global';
import {
  RatingNeighbors,
} from '../types/ratingLeaderboard';
import {
  fetchLeaderboardNeighborsById,
} from '../../api/ratingLeaderboardApi';

interface ThunkProps {
  id?: number;
  neighbors?: number;
}

export const getRatingNeighbors = createAsyncThunk<RatingNeighbors,
  ThunkProps,
  ThunkConfig<string>>(
    'GET_RATING_NEIGHBORS',
    async (props, thunkAPI) => {
      const {
        rejectWithValue, dispatch,
      } = thunkAPI;
      const { id, neighbors = 30 } = props;

      try {
        const res = await dispatch(fetchLeaderboardNeighborsById({ id, neighbors })).unwrap();

        return res;
      } catch (e) {
        return rejectWithValue(e?.response?.data?.message || LESTA_UNAVAILABLE);
      }
    },
  );
