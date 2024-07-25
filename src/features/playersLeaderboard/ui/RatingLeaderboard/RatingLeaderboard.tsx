import {
  memo, useCallback, useEffect, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { PageError } from 'shared/ui/PageError/PageError';
import { useInView } from 'react-intersection-observer';
import { getRatingNeighbors } from '../../model/services/getRatingNeighbors';
import {
  initRatingLeaderboard,
} from '../../model/services/initRatingLeaderboard';
import {
  CurrentUserRating,
} from '../CurrentUserRating/CurrentUserRating';
import {
  getLeaderboardHasMore,
  getRatingError,
  getRatingLeaderboardInitiated, getRatingLeaderboardLoadingStatus, getSeasonInfo,
} from '../../model/selectors/ratingSelectors';
import {
  getRatingLeaderboard,
} from '../../model/services/getRatingLeaderboard';
import {
  getLeaderboardMembers,
} from '../../model/slice/ratingSlice';
import { RatingLeagues } from './RatingLeagues';
import { RatingItem } from '../RatingItem/RatingItem';
import { RatingItemSkeleton } from '../RatingItem/RatingItemSkeleton';
import { RewardData, SeasonInfo } from '../../model/types/ratingLeaderboard';
import cls from './RatingLeaderboard.module.scss';

const getSkeletons = () => (
  new Array(10)
    .fill(0)
    .map((_, i) => (
      <RatingItemSkeleton key={i} />
    ))
);

export const RatingLeaderboard = memo(() => {
  const isInitiated = useSelector(getRatingLeaderboardInitiated);
  const isLoading = useSelector(getRatingLeaderboardLoadingStatus);
  const error = useSelector(getRatingError);
  const hasMore = useSelector(getLeaderboardHasMore);
  const players = useSelector(getLeaderboardMembers.selectAll);
  const lastPlayerAtLeaderboard = [...players].pop()!;
  const { t } = useTranslation('rating');
  const dispatch = useAppDispatch();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isLoading && hasMore) {
      dispatch(getRatingNeighbors({ id: lastPlayerAtLeaderboard.spa_id, neighbors: 60 }));
    }
  }, [inView, isLoading, hasMore, dispatch, lastPlayerAtLeaderboard]);

  const seasonData = useSelector(getSeasonInfo);

  const getRewardsMap = useCallback((seasonInfo: SeasonInfo) => {
    const map: Record<number, RewardData> = {};

    seasonInfo?.rewards?.forEach((r) => {
      for (let i = r.from_position; i <= r.to_position; i += 1) {
        if (r.type === 'vehicle') {
          map[i] = {
            title: r.vehicle.user_string,
            image: r.vehicle.preview_image_url,
            type: r.type,
          };
        } else {
          map[i] = {
            title: r.stuff.title,
            image: r.stuff.image_url,
            type: r.type,
            count: r.count,
          };
        }
      }
    });

    return map;
  }, []);

  const rewardsMap = useMemo(() => getRewardsMap(seasonData), [getRewardsMap, seasonData]);

  const getRewardData = useCallback((position: number) => {
    if (rewardsMap[position]) return rewardsMap[position];

    return null;
  }, [rewardsMap]);

  useEffect(() => {
    dispatch(initRatingLeaderboard());
  }, [dispatch]);

  useEffect(() => {
    if (isInitiated && !error) {
      dispatch(getRatingLeaderboard({}));
    }
  }, [dispatch, isInitiated, error]);

  if (error) {
    return (
      <PageError className={cls.error} errorMessage={error} />
    );
  }

  return (
    <>
      <SeoUpdater
        title={t('MMR_PAGE_TITLE')}
        canonicalLink={`${RoutePath.rating}/?type=mmr`}
        description={t('MMR_PAGE_DESCRIPTION')}
      />
      <RatingLeagues />
      <ul className={cls.ratingList}>
        <CurrentUserRating getRewardData={getRewardData} />
        {
          players?.map((p) => (<RatingItem key={p.spa_id} player={p} reward={getRewardData(p.number)} />))
         }
        {isLoading && getSkeletons()}
        <div style={{ height: 20 }} ref={ref} />
      </ul>
    </>
  );
});
