import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Suspense, useEffect, useLayoutEffect, useState,
} from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { Sidebar } from 'widgets/Sidebar';
import { LOCAL_STORAGE_LESTA, LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import {
  getCurrentUserError,
  getLoggedInStatus, getUserAuthInitiation,
  userActions,
} from 'entities/User';
import Loader from 'shared/ui/Loader/Loader';
import { Header } from 'widgets/Header/ui/Header';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import { checkUserAuth } from 'entities/User/model/services/checkUserAuth/checkUserAuth';
import {
  authByLestaOpenID,
} from 'features/AuthUser/model/services/authByLestaOpenID/authByLestaOpenID';
import { Theme, useTheme } from '../../../providers/ThemeProvider';
import cls from './AppLayout.module.scss';

function AppLayout() {
  const { theme } = useTheme();
  const isAuthInitiated = useSelector(getUserAuthInitiation);
  const isLoggedIn = useSelector(getLoggedInStatus);
  const currentUserError = useSelector(getCurrentUserError);
  const dispatch = useAppDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [queryParams] = useSearchParams();
  console.log(isAuthInitiated);

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.body.style.setProperty('--app-background', '#0C0C0E');
    } else {
      document.body.style.setProperty('--app-background', '#d7d7e1');
    }
  }, [theme]);

  useEffect(() => {
    if (!isAuthInitiated) {
      dispatch(checkUserAuth());
    }
  }, [dispatch, isAuthInitiated]);

  useEffect(() => {
    // NEW
    // проверяем авторизацию пользователя
    // dispatch(checkUserAuth());
    // LestaOpenID
    const lestaAuthStatus = queryParams.get(LOCAL_STORAGE_LESTA.STATUS);
    const isLestaAuth = !!lestaAuthStatus;

    if (isLestaAuth && lestaAuthStatus === 'ok') {
      const lestaData = {
        status: lestaAuthStatus,
        access_token: queryParams.get(LOCAL_STORAGE_LESTA.TOKEN),
        nickname: queryParams.get(LOCAL_STORAGE_LESTA.NICKNAME),
        account_id: +queryParams.get(LOCAL_STORAGE_LESTA.ID),
        expires_at: +queryParams.get(LOCAL_STORAGE_LESTA.EXPIRES_AT),
      };

      dispatch(authByLestaOpenID(lestaData));
    }
    // // OLD
    // const savedUserData = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE_USER_KEY),
    // );
    //
    // if (savedUserData) {
    //   dispatch(userActions.setAuthData(savedUserData));
    //   dispatch(userActions.setLoggedIn(true));
    // }
    //
    // if (isLestaAuth && lestaAuthStatus === 'ok') {
    //   const postData = async (data: any) => {
    //     try {
    //       const res = await axios.post('http://localhost:3030/auth/lesta', data, { withCredentials: true });
    //       // записываем данные в локалсторейдж
    //       localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.userData));
    //       localStorage.setItem(LOCAL_STORAGE_LESTA.TOKEN, JSON.stringify(queryParams.get(LOCAL_STORAGE_LESTA.TOKEN)));
    //       localStorage
    //         .setItem(LOCAL_STORAGE_LESTA.EXPIRES_AT, JSON.stringify(queryParams.get(LOCAL_STORAGE_LESTA.EXPIRES_AT)));
    //       dispatch(userActions.setAuthData(res.data.userData));
    //       dispatch(userActions.setLoggedIn(true));
    //     } catch (e) {
    //       console.error(e?.message);
    //     }
    //   };
    //
    //   const lestaData = {
    //     status: queryParams.get(LOCAL_STORAGE_LESTA.STATUS),
    //     access_token: queryParams.get(LOCAL_STORAGE_LESTA.TOKEN),
    //     nickname: queryParams.get(LOCAL_STORAGE_LESTA.NICKNAME),
    //     account_id: queryParams.get(LOCAL_STORAGE_LESTA.ID),
    //     expires_at: queryParams.get(LOCAL_STORAGE_LESTA.EXPIRES_AT),
    //   };
    //
    //   postData(lestaData);
    // }
  }, [dispatch, isLoggedIn, queryParams]);

  return (
    <Suspense fallback={<Loader />}>
      <SeoUpdater />
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
      </div>
    </Suspense>
  );
}

export default AppLayout;
