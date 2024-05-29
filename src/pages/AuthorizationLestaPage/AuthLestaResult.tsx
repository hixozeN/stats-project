import Loader from 'shared/ui/Loader/Loader';
import { useSelector } from 'react-redux';
import { getLoggedInStatus } from 'entities/User/index';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export const AuthLestaResult = () => {
  const isLoggedIn = useSelector(getLoggedInStatus);
  const location = useLocation();

  if (!location.search.length) return <Navigate to={RoutePath.main} replace />;

  if (isLoggedIn) {
    return <Navigate to={RoutePath.main} replace />;
  }

  return <Loader />;
};
