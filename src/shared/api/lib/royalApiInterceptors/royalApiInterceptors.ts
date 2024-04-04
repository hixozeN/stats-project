import {
  Action, Store, ThunkDispatch,
} from '@reduxjs/toolkit';
import { LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { userActions } from 'entities/User';
import { NavigateOptions, To } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { StateSchema } from 'app/providers/StoreProvider';
import { UnknownAsyncThunkAction } from '@reduxjs/toolkit/dist/matchers';
import { $royalApi } from '../../royalApi';

export const royalApiInterceptors = (
  store: Store<StateSchema, Action> & {
    dispatch: ThunkDispatch<StateSchema, unknown, UnknownAsyncThunkAction>;
  },
  navigate?: (to: To, options?: NavigateOptions,
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
    if (error.response.status === 401
      && error.response.data.message === 'С токеном что-то не так...'
      && error.config
      && !error._isRetry) {
      originalRequest._isRetry = true;
      try {
        const res = await $royalApi.get('/auth/refresh', { withCredentials: true });
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.userData));
        originalRequest.headers.Authorization = `Bearer ${res.data.userData.accessToken}`;
        return $royalApi.request(originalRequest);
      } catch (refreshToken) {
        await $royalApi.post('/auth/logout', { withCredentials: true });
        throw refreshToken;
      }
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
