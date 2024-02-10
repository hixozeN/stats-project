import { classNames } from 'shared/lib/classNames/classNames';
import { Sidebar } from 'widgets/Sidebar';
import {
  Suspense, useEffect, useLayoutEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInStatus } from 'entities/User/model/selectors/getLoggedInStatus/getLoggedInStatus';
import { LOCAL_STORAGE_LESTA, LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { userActions } from 'entities/User/index';
import { Outlet, useSearchParams, useMatch } from 'react-router-dom';
import Loader from 'shared/ui/Loader/Loader';
import { Header } from 'widgets/Header/ui/Header';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Footer } from 'widgets/Footer/index';
import axios from 'axios';
import { Theme, useTheme } from '../../../providers/ThemeProvider';
import cls from './AppLayout.module.scss';

function AppLayout() {
  const { theme } = useTheme();
  const isLoggedIn = useSelector(getLoggedInStatus);
  const dispatch = useDispatch();
  const isLandingPage = useMatch(RoutePath.main);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [queryParams] = useSearchParams();

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.body.style.setProperty('--app-background', '#0C0C0E');
    } else {
      document.body.style.setProperty('--app-background', '#d7d7e1');
    }
  }, [theme]);

  useLayoutEffect(() => {
    const savedUserData = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_USER_KEY),
    );

    const lestaAuthStatus = queryParams.get(LOCAL_STORAGE_LESTA.STATUS);
    const isLestaAuth = !!lestaAuthStatus;

    if (savedUserData) {
      dispatch(userActions.setAuthData(savedUserData));
      dispatch(userActions.setLoggedIn(true));
    }

    if (isLestaAuth && lestaAuthStatus === 'ok') {
      const postData = async (data: any) => {
        try {
          const res = await axios.post('http://192.168.3.81:3030/auth/lesta', data, { withCredentials: true });
          // записываем данные в локалсторейдж
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.userData));
          dispatch(userActions.setAuthData(res.data.userData));
          dispatch(userActions.setLoggedIn(true));
        } catch (e) {
          console.error(e?.message);
        }
      };

      const lestaData = {
        status: queryParams.get(LOCAL_STORAGE_LESTA.STATUS),
        access_token: queryParams.get(LOCAL_STORAGE_LESTA.TOKEN),
        nickname: queryParams.get(LOCAL_STORAGE_LESTA.NICKNAME),
        account_id: queryParams.get(LOCAL_STORAGE_LESTA.ID),
        expires_at: queryParams.get(LOCAL_STORAGE_LESTA.EXPIRES_AT),
      };

      postData(lestaData);
    }
  }, [dispatch, queryParams]);

  return (
    <Suspense fallback={<Loader />}>
      <div id="app" className={classNames('app', {}, [theme])}>
        <Header />
        <main className="page-content">
          {isLoggedIn && (
            <Sidebar
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          )}
          <Suspense fallback={<Loader />}>
            {/* <AppRouter /> */}
            <div
              className={classNames(
                cls.pageWrapper,
                { [cls.collapsed]: isCollapsed, [cls.loggedIn]: !isLoggedIn },
              )}
            >
              <Outlet />
            </div>
          </Suspense>
        </main>
        {isLandingPage && <Footer />}
      </div>
    </Suspense>
  );
}

export default AppLayout;
