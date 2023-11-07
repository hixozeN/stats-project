import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User/index';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      user: userReducer,
    },
    preloadedState: initialState,
    devTools: IS_DEV,
  });
}
