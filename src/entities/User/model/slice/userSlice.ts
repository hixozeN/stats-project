import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authByLestaOpenID } from 'features/AuthUser/index';
import { patchCurrentUser, patchCurrentUserAvatar } from 'features/editCurrentUserPorfile/index';
import { LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { logoutUser } from '../services/logoutUser/logoutUser';
import { checkUserAuth } from '../services/checkUserAuth/checkUserAuth';
import { LestaUserData, User, UserSchema } from '../types/user';

const initialState: UserSchema = {
  isLoggedIn: false,
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
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      state.authData = null;
      state.isLoggedIn = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLestaTokenData: (state, action: PayloadAction<LestaUserData>) => {
      // используется в интерцепторе для перехвата 401 по лестовскому токену
      // получает актуальные данные по токену и перезаписывает
      state.authData.lestaData = {
        ...state.authData.lestaData,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.pending, (state) => {
        state.error = '';
        state.isLoading = true;
        state.isInitiated = true;
        state.isTokenRefreshing = true;
      })
      .addCase(checkUserAuth.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isTokenRefreshing = false;
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      })
      .addCase(checkUserAuth.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isTokenRefreshing = false;
        state.authData = payload;
      })
      .addCase(authByLestaOpenID.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.authData = payload;
      })
      .addCase(authByLestaOpenID.rejected, (state, _) => {
        state.isLoggedIn = false;
        state.authData = null;
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.authData = null;
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      })
      .addCase(patchCurrentUser.fulfilled, (state, { payload }) => {
        state.authData = { ...state.authData, ...payload };
      })
      .addCase(patchCurrentUser.rejected, (state, { payload }) => {
        state.updateProfileError = payload;
      })
      .addCase(patchCurrentUserAvatar.fulfilled, (state, { payload }) => {
        state.authData.avatar = payload.avatar;
      });
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
