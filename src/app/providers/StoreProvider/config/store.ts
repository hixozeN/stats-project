import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { searchReducer } from 'features/Search';
import { $api } from 'shared/api/api';
import { NavigateOptions, To } from 'react-router-dom';
import { tournamentReducer } from 'entities/Tournament';
import {
  lestaReducer, clanReducers, userTanksReducer, userDataReducer, userSessionReducer,
} from 'entities/Lesta';
import { teamReducer } from 'entities/Team';
import { $lestaApi } from 'shared/api/lestaApi';
import { $royalApi } from 'shared/api/royalApi';
import { starsReducer } from 'features/playersLeaderboard';
import { filterReducer, sortReducer } from 'features/Filter';
import { SortListPlayersReducer } from 'features/SortClanListPlayers';
import { rtkApi } from 'shared/api/rtkApi';
import { SessionWidgetReducer } from 'features/createSessionWidget';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  // eslint-disable-next-line no-unused-vars
  navigate?: (to: To, options?: NavigateOptions) => void,
  toastSuccess?: (text: string) => void,
  toastWithError?: (text: string) => void,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    searchForm: searchReducer,
    tournaments: tournamentReducer,
    lesta: lestaReducer,
    lestaUserData: userDataReducer,
    lestaUserSession: userSessionReducer,
    teams: teamReducer,
    lestaClanData: clanReducers,
    userTanks: userTanksReducer,
    stars: starsReducer,
    filter: filterReducer,
    sort: sortReducer,
    sortListPlayers: SortListPlayersReducer,
    sessionWidget: SessionWidgetReducer,
    // rtkApi reducer
    [rtkApi.reducerPath]: rtkApi.reducer,
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
          toastSuccess,
          toastWithError,
        },
      },
    }).concat(rtkApi.middleware),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

// https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
