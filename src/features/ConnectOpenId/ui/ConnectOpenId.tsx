import { memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User';
import {
  ReducerList,
  useDynamicReducerLoader,
} from 'shared/hooks/useDynamicReducerLoader/useDynamicReducerLoader';
import { Navigate, useSearchParams } from 'react-router-dom';
import { LOCAL_STORAGE_LESTA } from 'shared/consts/localstorage';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { CONNECT_ID_URL } from 'shared/consts/openID';
import Loader from 'shared/ui/Loader/Loader';
import { useToasts } from 'shared/hooks/useToasts/useToasts';
import { openIdReducer } from '../model/slice/openIdSlice';
import { getOpenIdState } from '../model/selectors';
import { connectLestaOpenId } from '../model/services/connectLestaOpenId/connectLestaOpenId';
import cls from './ConnectOpenId.module.scss';

interface ConnectOpenIdProps {
  className?: string;
}

const initialReducers: ReducerList = { openId: openIdReducer };
const OPEN_AUTH_ERROR_MESSAGES: Record<number, string> = {
  0: 'unexpectedError',
  401: 'canceledByUser',
  403: 'authTimedOut',
  410: 'authError',
};

export const ConnectOpenId = memo((props: ConnectOpenIdProps) => {
  const { className } = props;
  useDynamicReducerLoader({ reducers: initialReducers, removeAfterUnmount: true });
  const { toastSuccess, toastWithError } = useToasts();
  const { t } = useTranslation('openID');
  const authData = useSelector(getUserData);
  const { isInitiated = false, isLoading = false, error = '' } = useSelector(getOpenIdState);
  const isLestaUser = !!authData?.lestaData?.account_id;
  const dispatch = useAppDispatch();
  const [queryParams] = useSearchParams();

  const handleConnectOpenId = useCallback(() => {
    window.location.replace(CONNECT_ID_URL);
  }, []);

  const handleSuccessConnect = useCallback(() => {
    toastSuccess(t('successConnect'));
    const account_id = queryParams.get(LOCAL_STORAGE_LESTA.ID);
    return <Navigate to={`/user/${account_id}`} />;
  }, [toastSuccess, queryParams, t]);

  useEffect(() => {
    const authStatus = queryParams.get(LOCAL_STORAGE_LESTA.STATUS);
    const isSuccess = authStatus === 'ok';

    if (isSuccess) {
      dispatch(connectLestaOpenId({
        account_id: +queryParams.get(LOCAL_STORAGE_LESTA.ID),
        access_token: queryParams.get(LOCAL_STORAGE_LESTA.TOKEN),
        expires_at: +queryParams.get(LOCAL_STORAGE_LESTA.EXPIRES_AT),
        nickname: queryParams.get(LOCAL_STORAGE_LESTA.NICKNAME),
        status: authStatus,
      }));
    }

    if (authStatus === 'error') {
      const errorCode = +queryParams.get('code') ?? 0;
      const message = OPEN_AUTH_ERROR_MESSAGES[errorCode];
      toastWithError(t(message));
    }
  }, [dispatch, queryParams, toastWithError, t]);

  if (isInitiated && isLoading) return <Loader />;

  if (isInitiated && !error) {
    return (
      <article className={classNames(cls.infoArticle, {}, [className])}>
        {isLoading ? <Loader /> : handleSuccessConnect()}
      </article>
    );
  }

  if (isLestaUser && !isInitiated) {
    return <Navigate to={`/user/${authData.lestaData.account_id}`} />;
  }

  return (
    <article className={classNames(cls.infoArticle, {}, [className])}>
      <p>
        {t('restrictedStats')}
        <a
          className={classNames(cls.link, {}, ['link-hovered'])}
          href="https://lesta.ru/ru"
          target="_blank"
          rel="noreferrer"
        >
          {t('Lesta Games Open ID')}
        </a>
        .
      </p>
      <Button variant="join" onClick={handleConnectOpenId}>{t('connectLesta')}</Button>
    </article>
  );
});
