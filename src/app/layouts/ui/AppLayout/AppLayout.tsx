import { classNames } from 'shared/lib/classNames/classNames';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInStatus } from 'entities/User/model/selectors/getLoggedInStatus/getLoggedInStatus';
import { LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { userActions } from 'entities/User/index';
import { Outlet, useLocation } from 'react-router-dom';
import Loader from 'shared/ui/Loader/Loader';
import { Header } from 'widgets/Header/ui/Header';
import { Footer } from 'widgets/Footer/ui/Footer';
import { useSizeScreen } from 'shared/hooks/useSizeScreen';
import { Theme, useTheme } from '../../../providers/ThemeProvider';

function AppLayout() {
  const { theme } = useTheme();
  const { height } = useSizeScreen();
  const isLoggedIn = useSelector(getLoggedInStatus);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    document.body.style.setProperty('--vh', `${height}px`);
  }, [height]);
  useEffect(() => {
    // const body = document.querySelector('.body-root');

    if (theme === Theme.DARK) {
      document.body.style.setProperty('--app-background', '#0C0C0E');
    } else {
      document.body.style.setProperty('--app-background', '#d7d7e1');
    }
  }, [theme]);

  useEffect(() => {
    const savedUserData = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_USER_KEY),
    );

    if (savedUserData) {
      dispatch(userActions.setAuthData(savedUserData));
      dispatch(userActions.setLoggedIn(true));
    }
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <div id="app" className={classNames('app', {}, [theme])}>
        <Header />
        <div className="page-content">
          {isLoggedIn && <Sidebar />}
          <Suspense fallback={<Loader />}>
            {/* <AppRouter /> */}
            <div className="page-wrapper">
              <Outlet />
            </div>
          </Suspense>
        </div>
        {location.pathname === '/' ? <Footer /> : ''}
      </div>
    </Suspense>
  );
}

export default AppLayout;
