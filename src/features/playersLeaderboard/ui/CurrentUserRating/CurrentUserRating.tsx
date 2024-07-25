import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUserAccountId } from 'entities/User';
import { RatingItemSkeleton } from '../RatingItem/RatingItemSkeleton';
import { RatingItem } from '../RatingItem/RatingItem';
import {
  getCurrentUserRatingData, getCurrentUserRatingLoadingStatus,
} from '../../model/selectors/ratingSelectors';
import { RewardData } from '../../model/types/ratingLeaderboard';

interface CurrentUserRatingProps {
  getRewardData: (num: number) => RewardData;
}

export const CurrentUserRating = memo((props: CurrentUserRatingProps) => {
  const { getRewardData } = props;
  const currentUserId = useSelector(getCurrentUserAccountId);
  const currentUserRatingData = useSelector(getCurrentUserRatingData);
  const isLoading = useSelector(getCurrentUserRatingLoadingStatus);

  if (!currentUserId || !currentUserRatingData) return null;

  if (isLoading) {
    return (
      <RatingItemSkeleton />
    );
  }

  return (
    <RatingItem
      isCurrentUser
      player={currentUserRatingData}
      reward={
        currentUserRatingData?.number
          ? getRewardData(currentUserRatingData?.number)
          : null
      }
    />
  );
});
