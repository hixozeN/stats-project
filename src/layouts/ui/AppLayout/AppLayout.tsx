import { useSelector } from 'react-redux';
import {
  Suspense, useCallback, useEffect,
} from 'react';
import { Outlet, useMatch, useSearchParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { Sidebar } from 'widgets/Sidebar';
import { LOCAL_STORAGE_LESTA } from 'shared/consts/localstorage';
import {
  getUserAuthInitiation,
  checkUserAuth, getCurrentUserError, getFullUserState,
} from 'entities/User';
import Loader from 'shared/ui/Loader/Loader';
import { Header } from 'widgets/Header';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import { authByLestaOpenID } from 'features/AuthUser';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import { useToasts } from 'shared/hooks/useToasts/useToasts';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Footer } from 'widgets/Footer/index';
import cls from './AppLayout.module.scss';

function AppLayout() {
  const { theme } = useTheme();
  const isAuthInitiated = useSelector(getUserAuthInitiation);
  const isAuthLoading = useSelector(getFullUserState).isLoading;
  const currentUserError = useSelector(getCurrentUserError);
  const isMainPage = useMatch(RoutePath.main);
  const dispatch = useAppDispatch();
  const [queryParams] = useSearchParams();
  const { toastWithError } = useToasts();

  const handleOpenAuth = useCallback(async () => {
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

      await dispatch(authByLestaOpenID(lestaData));
    }
  }, [dispatch, queryParams]);

  useEffect(() => {
    if (currentUserError) {
      toastWithError(currentUserError);
    }
  }, [currentUserError, toastWithError]);

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
    if (isMainPage) handleOpenAuth();
  }, [isMainPage, handleOpenAuth]);

  if (isAuthLoading || !isAuthInitiated) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Toaster />
      <SeoUpdater />
      <div id="app" className={classNames('app', {}, [theme])}>
        <Header />
        <main className="page-content">
          {/* {!isAuthPage && <Sidebar />} */}
          <Sidebar />
          <Suspense fallback={<Loader />}>
            <div
              className={classNames(
                cls.pageWrapper,
                { [cls.collapsed]: false },
              )}
            >
              <Outlet />
            </div>
          </Suspense>
        </main>
        {isMainPage && <Footer />}
      </div>
    </Suspense>
  );
}

export default AppLayout;
