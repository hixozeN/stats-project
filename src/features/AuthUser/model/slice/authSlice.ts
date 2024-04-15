import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSchema } from '../types/AuthSchema';
import { authUserService } from '../services/authUserService/authUserService';

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
      .addCase(authUserService.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(authUserService.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(authUserService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
