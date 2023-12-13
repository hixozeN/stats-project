import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSchema } from '../types/AuthSchema';
import { loginByEmail } from '../services/loginByEmail/loginByEmail';

const initialState: AuthSchema = {
  email: '',
  password: '',
  username: '',
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'authForm',
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
  extraReducers: (builder) => {
    builder
      .addCase(loginByEmail.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(loginByEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
