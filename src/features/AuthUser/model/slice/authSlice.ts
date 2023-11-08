import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSchema } from '../types/authSchema';

const initialState: AuthSchema = {
  email: '',
  password: '',
  username: '',
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUserPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
