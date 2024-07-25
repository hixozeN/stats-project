import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';

// Define a service using a base URL and expected endpoints
export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ROYAL_ARENA_API_URL,
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY))?.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
