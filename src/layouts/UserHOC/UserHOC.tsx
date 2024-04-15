import { useSelector } from 'react-redux';
import { getLoggedInStatus, getUserData } from 'entities/User';
import { Navigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export const UserHOC = () => {
  const authData = useSelector(getUserData);
  const isLestaUser = !!authData?.lestaData?.account_id;
  const isLoggedIn = useSelector(getLoggedInStatus);

  if (!isLoggedIn) {
    return <Navigate to={RoutePath.auth} replace />;
  }

  if (isLestaUser) {
    return <Navigate to={`/user/${authData.lestaData.account_id}`} replace />;
  }

  return (
    <Navigate to={RoutePath.connectLesta} replace />
  );
};
