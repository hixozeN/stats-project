/* eslint-disable no-unused-vars */
import { UserSchema } from 'entities/User';
import { AuthSchema } from 'features/AuthUser';
import { SearchSchema } from 'features/Search/model/slice/searchSlice';
import {
  AnyAction,
  CombinedState, Dispatch,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
// import { To } from '@remix-run/router';
// import { NavigateOptions } from 'react-router/dist/lib/context';
import { NavigateOptions, To } from 'react-router-dom';

export interface StateSchema {
  user: UserSchema;
  searchForm: SearchSchema;
  // async reducers
  authForm?: AuthSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArgument {
  api: AxiosInstance,
  navigate: (to: To, options?: NavigateOptions) => void,
}

export interface ThunkConfig<T> {
  rejectValue: T,
  extra: ThunkExtraArgument,
  state: StateSchema,
  dispatch: Dispatch,
}
