import { classNames } from 'shared/lib/classNames/classNames';
import { Sidebar } from 'widgets/Sidebar';
import {
  Suspense, useEffect, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoggedInStatus,
} from 'entities/User/model/selectors/getLoggedInStatus/getLoggedInStatus';
import { LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { userActions } from 'entities/User/index';
import { Header } from 'widgets/Header';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';

function App() {
  const { theme } = useTheme();
  const debouncer = useRef(null);
  const isLoggedIn = useSelector(getLoggedInStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleHeight = () => {
      clearTimeout(debouncer.current);

      debouncer.current = setTimeout(() => {
        const vh = window.innerHeight;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
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
    const savedUserData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));

    if (savedUserData) {
      dispatch(userActions.setAuthData(savedUserData));
      dispatch(userActions.setLoggedIn(true));
    }
  }, [dispatch]);

  return (
    <div id="app" className={classNames('app', {}, [theme])}>
      {/* suspense для подгрузки чанков с переводами */}
      <Suspense fallback="">
        <Header />
        <div className="page-content">
          {isLoggedIn && <Sidebar />}
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
