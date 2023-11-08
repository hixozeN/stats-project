import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { authReducer } from 'features/AuthUser';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      user: userReducer,
      authForm: authReducer,
    },
    preloadedState: initialState,
    devTools: IS_DEV,
  });
}
