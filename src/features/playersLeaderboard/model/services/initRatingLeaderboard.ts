import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { LESTA_UNAVAILABLE } from 'shared/consts/global';
import { getCurrentUserAccountId } from 'entities/User';
import { getRatingNeighbors } from './getRatingNeighbors';
import { getSeasonInfo } from '../../api/ratingLeaderboardApi';
import {
  getRatingLeaderboardInitiated,
} from '../selectors/ratingSelectors';
import { ratingActions } from '../slice/ratingSlice';

export const initRatingLeaderboard = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
  >(
    'INIT_RATING_LEADERBOARD',
    async (props, thunkAPI) => {
      const {
        dispatch, getState,
      } = thunkAPI;

      const isInitiated = getRatingLeaderboardInitiated(getState());
      const currentUserId = getCurrentUserAccountId(getState());

      if (!isInitiated) {
        await dispatch(
          getSeasonInfo(),
        ).unwrap()
          .then(async (data) => {
            if (currentUserId) {
              dispatch(ratingActions.setCurrentUserRatingLoading(true));
              const currentUserRatingData = await dispatch(getRatingNeighbors({ id: currentUserId })).unwrap();
              dispatch(ratingActions.setCurrentUserData(currentUserRatingData.player));
              dispatch(ratingActions.setCurrentUserRatingLoading(false));
            }

            dispatch(ratingActions.setSeasonData(data));
          })
          .catch((e) => dispatch(ratingActions.setError(e?.data?.message || LESTA_UNAVAILABLE)));

        dispatch(ratingActions.initState());
      }
    },
  );
