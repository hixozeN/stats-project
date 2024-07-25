import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { LESTA_UNAVAILABLE } from 'shared/consts/global';
import { RatingItemFromLesta } from '../types/ratingLeaderboard';
import { fetchLeaderboardByLeagueId } from '../../api/ratingLeaderboardApi';
import { getRatingLeague } from '../selectors/ratingSelectors';

interface ThunkProps {
  replace?: boolean;
}

export const getRatingLeaderboard = createAsyncThunk<RatingItemFromLesta[],
  ThunkProps,
  ThunkConfig<string>>(
    'GET_RATING_LEADERBOARD',
    async (props, thunkAPI) => {
      const {
        getState, rejectWithValue, dispatch,
      } = thunkAPI;

      const league = getRatingLeague(getState());

      try {
        const leaderboard = await dispatch(fetchLeaderboardByLeagueId({ league })).unwrap();

        return leaderboard;
      } catch (e) {
        return rejectWithValue(e?.response?.data?.message || LESTA_UNAVAILABLE);
      }
    },
  );
