import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_LESTA, LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { authByLestaOpenID } from 'features/AuthUser/index';
import { refreshLestaToken } from 'entities/User/index';
import { User, UserSchema } from '../types/user';
import { checkUserAuth } from '../services/checkUserAuth/checkUserAuth';

const initialState: UserSchema = {
  isLoggedIn: !!localStorage.getItem(LOCAL_STORAGE_USER_KEY),
  isInitiated: false,
};

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    logout: (state) => {
      localStorage.clear();
      state.authData = null;
      state.isLoggedIn = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.pending, (state) => {
        state.error = '';
        state.isLoading = true;
        state.isInitiated = true;
      })
      .addCase(checkUserAuth.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
        state.isLoggedIn = false;
        localStorage.clear();
      })
      .addCase(checkUserAuth.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.authData = payload;
      })
      .addCase(authByLestaOpenID.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.authData = payload;
      })
      .addCase(refreshLestaToken.pending, (state) => {
        state.isTokenRefreshing = true;
      })
      .addCase(refreshLestaToken.fulfilled, (state, { payload }) => {
        state.isTokenRefreshing = false;

        localStorage.setItem(LOCAL_STORAGE_LESTA.TOKEN, JSON.stringify(payload.access_token));
        localStorage.setItem(LOCAL_STORAGE_LESTA.EXPIRES_AT, JSON.stringify(payload.expires_at));
      })
      .addCase(refreshLestaToken.rejected, (state, { payload }) => {
        state.isTokenRefreshing = false;

        if (payload === 407) {
          state.isLoggedIn = false;
          localStorage.clear();
        }
      });
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
