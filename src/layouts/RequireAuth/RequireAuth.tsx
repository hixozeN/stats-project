import { useSelector } from 'react-redux';
import { getLoggedInStatus } from 'entities/User';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export const RequireAuth = () => {
  const isLoggedIn = useSelector(getLoggedInStatus);
  const location = useLocation();

  if (!isLoggedIn) return <Navigate to={RoutePath.main} state={{ from: location }} replace />;

  return <Outlet />;
};
