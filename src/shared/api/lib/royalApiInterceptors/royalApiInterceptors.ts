import {
  Action, Store, ThunkDispatch,
} from '@reduxjs/toolkit';
import { LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { userActions } from 'entities/User';
import { NavigateOptions, To } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { StateSchema } from 'app/providers/StoreProvider/index';
import {
  refreshUserTokens,
} from 'entities/User/model/services/refreshUserTokens/refreshUserTokens';
import { UnknownAsyncThunkAction } from '@reduxjs/toolkit/dist/matchers';
import { $royalApi } from '../../royalApi';

export const royalApiInterceptors = (
  store: Store<StateSchema, Action<any>> & {
    dispatch: ThunkDispatch<StateSchema, unknown, UnknownAsyncThunkAction>;
  },
  navigate?: (to: To, options?: NavigateOptions
  ) => void,
) => {
  // добавление access токена в заголовки
  $royalApi.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY))?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // обновление токенов
  $royalApi.interceptors.response.use((config) => config, (async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error._isRetry) {
      originalRequest._isRetry = true;
      await store.dispatch(refreshUserTokens({ originalRequest }));
      return $royalApi.request(originalRequest);
    }

    throw error;
  }));

  $royalApi.interceptors.response.use((config) => config, (async (error) => {
    if (error.response.status === 407) {
      store.dispatch(userActions.logout());
      navigate(RoutePath.main);
    }

    throw error;
  }));
};
