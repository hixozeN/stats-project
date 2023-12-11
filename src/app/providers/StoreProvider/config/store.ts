import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { authReducer } from 'features/AuthUser';
import { searchReducer } from 'features/Search';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      user: userReducer,
      authForm: authReducer,
      searchForm: searchReducer,
    },
    preloadedState: initialState,
    devTools: IS_DEV,
  });
}
