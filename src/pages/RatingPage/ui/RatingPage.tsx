import { memo, ReactNode, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ErrorBoundary } from 'app/providers/ErrorBoundary/index';
import { Background } from 'shared/ui/Background/Background';
import {
  leaderboardReducer,
  LeaderboardWithSorting,
  RatingLeaderboard,
  RatingRoutes,
  ratingReducer,
  getRatingLeaderboardState,
  SessionLeaderboard,
  VehicleLeaderboard,
} from 'features/playersLeaderboard';
import { Navigate, useSearchParams } from 'react-router-dom';
import { PlayerRatings } from 'widgets/PlayerRatings';
import {
  ReducerList,
  useDynamicReducerLoader,
} from 'shared/hooks/useDynamicReducerLoader/useDynamicReducerLoader';
import { useSelector } from 'react-redux';
import Loader from 'shared/ui/Loader/Loader';
import cls from './RatingPage.module.scss';

interface RatingPageProps {
  className?: string;
}

const initialReducers: ReducerList = {
  leaderboard: leaderboardReducer,
  ratingLeaderboard: ratingReducer,
};

const leaderboard: Record<RatingRoutes, ReactNode> = {
  vehicles: <VehicleLeaderboard />,
  players: <LeaderboardWithSorting />,
  mmr: <RatingLeaderboard />,
  sessions: <SessionLeaderboard />,
};

const RatingPage = memo((props: RatingPageProps) => {
  const { className } = props;
  useDynamicReducerLoader({ reducers: initialReducers, removeAfterUnmount: true });

  const ratingState = useSelector(getRatingLeaderboardState);

  const [params] = useSearchParams();
  const leaderboardType = params.get('type');

  const isAllowedRoute = useCallback(
    (param: string): param is RatingRoutes => Object.keys(leaderboard).includes(param),
    [],
  );

  const renderContent = useCallback((param: string) => {
    if (isAllowedRoute(param)) return leaderboard[param];
    return <Navigate to="/404" replace />;
  }, [isAllowedRoute]);

  if (!ratingState) return <Loader />;

  return (
    <ErrorBoundary>
      <Background />
      <div className={classNames(cls.RatingPage, {}, [className])}>
        <div className={cls.wrapper}>
          <PlayerRatings>
            {renderContent(leaderboardType)}
          </PlayerRatings>
        </div>
      </div>
    </ErrorBoundary>
  );
});

export default RatingPage;
