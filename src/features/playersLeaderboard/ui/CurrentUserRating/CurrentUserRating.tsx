import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUserAccountId, getUserData } from 'entities/User';
import { getLestaClanName, getLestaClanTag } from 'entities/Lesta';
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
  const user = useSelector(getUserData);
  const clanTag = useSelector(getLestaClanTag);
  const clanName = useSelector(getLestaClanName);
  const userData = {
    spa_id: currentUserId,
    mmr: currentUserRatingData?.mmr ?? null,
    season_number: currentUserRatingData?.season_number ?? null,
    calibrationBattlesLeft: currentUserRatingData?.calibrationBattlesLeft ?? 10,
    number: currentUserRatingData?.number ?? null,
    percentile: currentUserRatingData?.percentile ?? null,
    skip: currentUserRatingData?.skip ?? null,
    updated_at: currentUserRatingData?.updated_at ?? null,
    score: currentUserRatingData?.score ?? null,
    nickname: user.lestaData.nickname,
    clan_tag: clanTag,
    clan_name: clanName,
  };

  if (!currentUserId || !userData) return null;

  if (isLoading) {
    return (
      <RatingItemSkeleton />
    );
  }

  return (
    <RatingItem
      isCurrentUser
      player={userData}
      reward={
        currentUserRatingData?.number
          ? getRewardData(currentUserRatingData?.number)
          : null
      }
    />
  );
});
