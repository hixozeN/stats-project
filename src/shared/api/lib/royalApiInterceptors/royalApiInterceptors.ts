import { Store } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import axios from 'axios';
import { userActions } from 'entities/User';
import { $royalApi } from '../../royalApi';

export const royalApiInterceptors = (store: Store) => {
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
      try {
        const res = await axios.get(`${ROYAL_ARENA_API_URL}/auth/refresh`, { withCredentials: true });
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.userData));
        originalRequest.headers.Authorization = `Bearer ${res.data.userData.accessToken}`;
        return $royalApi.request(originalRequest);
      } catch (e) {
        store.dispatch(userActions.logout());
        return window.location.reload();
      }
    }

    throw error;
  }));
};
