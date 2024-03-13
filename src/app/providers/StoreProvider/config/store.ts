import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { searchReducer } from 'features/Search';
import { $api } from 'shared/api/api';
import { NavigateOptions, To } from 'react-router-dom';
import { tournamentReducer } from 'entities/Tournament';
import { lestaReducer } from 'entities/Lesta';
import { teamReducer } from 'entities/Team';
import { $lestaApi } from 'shared/api/lestaApi';
import { $royalApi } from 'shared/api/royalApi';
import { royalApiInterceptors } from 'shared/api/lib/royalApiInterceptors/royalApiInterceptors';
import { userDataReducers } from 'entities/Lesta/model/slice/userDataSlice';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  // eslint-disable-next-line no-unused-vars
  navigate?: (to: To, options?: NavigateOptions) => void,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    searchForm: searchReducer,
    tournaments: tournamentReducer,
    lesta: lestaReducer,
    lestaUserData: userDataReducers,
    teams: teamReducer,
    // async reducers
    // authForm: authReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce,
    preloadedState: initialState,
    devTools: IS_DEV,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: $api,
          lestaApi: $lestaApi,
          royalApi: $royalApi,
          navigate,
        },
      },
    }),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  royalApiInterceptors(store);

  return store;
}

// https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
