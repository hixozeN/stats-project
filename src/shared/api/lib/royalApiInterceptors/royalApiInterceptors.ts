import {
  Action, Store, ThunkDispatch,
} from '@reduxjs/toolkit';
import { LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { User, userActions } from 'entities/User';
import { NavigateOptions, To } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { StateSchema } from 'app/providers/StoreProvider';
import { UnknownAsyncThunkAction } from '@reduxjs/toolkit/dist/matchers';
import { LESTA_TOKEN_INTERCEPTOR_RESPONSE } from 'shared/consts/global';
import { $royalApi } from '../../royalApi';

const TOKEN_ERROR = 'С токеном что-то не так...';
const TOKEN_LESTA_ERROR = 'Токен Lesta Games недействителен.';

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
      && error.response.data.message === TOKEN_ERROR
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
    const originalRequest = error.config;
    if (error.response.status === 401
      && error.response.data.message === TOKEN_LESTA_ERROR
      && error.config
      && !error._isRetry) {
      originalRequest._isRetry = true;
      try {
        const userData = await $royalApi.get<User>('/user/me', { withCredentials: true });
        store.dispatch(userActions.setLestaTokenData(userData.data.lestaData));
        return LESTA_TOKEN_INTERCEPTOR_RESPONSE;
      } catch (e) {
        store.dispatch(userActions.logout());
        await $royalApi.post('/auth/logout', { withCredentials: true });
        navigate(RoutePath.main);

        throw e;
      }
    }

    throw error;
  }));
};
