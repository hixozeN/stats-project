import { EntityState } from '@reduxjs/toolkit';
import {
  RatingItemFromLesta,
  SeasonInfo,
} from './ratingLeaderboard';

export interface RatingSchema extends EntityState<RatingItemFromLesta> {
  isLoading: boolean;
  isInitiated: boolean;
  league: number;
  error?: string | undefined;
  seasonInfo?: SeasonInfo;
  leaderboard?: RatingItemFromLesta[];
  hasMore?: boolean;
  currentUserData?: RatingItemFromLesta;
  loaders?: {
    isNeighborsLoading?: boolean;
    isCurrentUserRatingLoading?: boolean;
  }
}
