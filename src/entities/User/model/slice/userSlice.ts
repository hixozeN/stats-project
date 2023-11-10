import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_USER_KEY } from 'shared/consts/localstorage';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
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
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
