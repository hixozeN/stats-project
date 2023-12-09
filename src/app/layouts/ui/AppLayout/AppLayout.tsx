import { Navbar } from 'widgets/Navbar';
import { classNames } from 'shared/lib/classNames/classNames';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoggedInStatus,
} from 'entities/User/model/selectors/getLoggedInStatus/getLoggedInStatus';
import { LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { userActions } from 'entities/User/index';
import { Outlet } from 'react-router-dom';
import Loader from 'shared/ui/Loader/Loader';
import { Theme, useTheme } from '../../../providers/ThemeProvider';

function AppLayout() {
  const { theme } = useTheme();
  const debouncer = useRef(null);
  const isLoggedIn = useSelector(getLoggedInStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleHeight = () => {
      clearTimeout(debouncer.current);

      debouncer.current = setTimeout(() => {
        const vh = window.innerHeight;
        document.body.style.setProperty('--vh', `${vh}px`);
      }, 300);
    };

    handleHeight();

    window.addEventListener('resize', handleHeight);

    return () => {
      clearTimeout(debouncer.current);
      window.removeEventListener('resize', handleHeight);
    };
  }, []);

  useEffect(() => {
    const body = document.querySelector('.body-root');

    if (theme === Theme.DARK) {
      document.body.style.setProperty('--app-background', '#0C0C0E');
    } else {
      document.body.style.setProperty('--app-background', '#d7d7e1');
    }
  }, [theme]);

  useEffect(() => {
    const savedUserData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));

    if (savedUserData) {
      dispatch(userActions.setAuthData(savedUserData));
      dispatch(userActions.setLoggedIn(true));
    }
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <div id="app" className={classNames('app', {}, [theme])}>
        <Navbar />
        <div className="page-content">
          {isLoggedIn && <Sidebar />}
          <Suspense fallback={<Loader />}>
            {/* <AppRouter /> */}
            <Outlet />
          </Suspense>
        </div>
      </div>
    </Suspense>
  );
}

export default AppLayout;
