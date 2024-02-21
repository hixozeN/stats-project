import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
  isLoggedIn: false,
  authData: null,
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
      localStorage.clear();
      state.authData = null;
      state.isLoggedIn = false;
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
