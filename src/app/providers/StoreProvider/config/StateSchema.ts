/* eslint-disable no-unused-vars */
import { UserSchema } from 'entities/User';
import { AuthSchema } from 'features/AuthUser';
import { SearchSchema } from 'features/Search/model/slice/searchSlice';
import {
  AnyAction,
  Dispatch,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { TournamentSchema } from 'entities/Tournament/model/types/tournament';
import { LestaClanSchema, LestaSchema } from 'entities/Lesta/index';

export interface StateSchema {
  user: UserSchema;
  searchForm: SearchSchema;
  tournaments: TournamentSchema;
  lesta: LestaSchema,
  lestaClanData: LestaClanSchema,
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
