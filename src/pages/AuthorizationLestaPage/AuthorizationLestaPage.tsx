import Loader from 'shared/ui/Loader/Loader';
import { useEffect } from 'react';
import { openIDURL } from 'shared/consts/openID';

export const AuthorizationLestaPage = () => {
  useEffect(() => {
    window.location.replace(openIDURL);
  }, []);

  return <Loader />;
};
