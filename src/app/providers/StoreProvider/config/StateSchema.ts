/* eslint-disable no-unused-vars */
import { UserSchema } from 'entities/User';
import { AuthSchema } from 'features/AuthUser';
import { SearchSchema } from 'features/Search/model/slice/searchSlice';
import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';

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
