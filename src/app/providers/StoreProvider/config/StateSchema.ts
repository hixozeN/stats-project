/* eslint-disable no-unused-vars */
import { UserSchema } from 'entities/User';
import { AuthSchema } from 'features/AuthUser';
import { SearchSchema } from 'features/Search';
import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { TournamentSchema } from 'entities/Tournament';
import {
  LestaSchema,
  LestaUserDataSchema,
  LestaTanksSchema,
  LestaUserSessionSchema,
  LestaClanSchema,
} from 'entities/Lesta';
import { TeamsSchema } from 'entities/Team';
import { FilterSchema, SortSchema } from 'features/Filter';
import { OpenIdSchema } from 'features/ConnectOpenId';
import { LeaderboardSchema, RatingSchema } from 'features/playersLeaderboard';
import { SortListPlayersSchema } from 'features/SortClanListPlayers';
import { rtkApi } from 'shared/api/rtkApi';
import { SessionWidgetSchema } from 'features/createSessionWidget';

export interface StateSchema {
  user: UserSchema;
  searchForm: SearchSchema;
  tournaments: TournamentSchema;
  lesta: LestaSchema,
  teams: TeamsSchema;
  lestaClanData: LestaClanSchema,
  lestaUserData: LestaUserDataSchema;
  lestaUserSession: LestaUserSessionSchema;
  filter: FilterSchema;
  sort: SortSchema;
  sortListPlayers: SortListPlayersSchema;
  userTanks: LestaTanksSchema;
  stars: LeaderboardSchema;
  sessionWidget: SessionWidgetSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
  // async reducers
  authForm?: AuthSchema;
  openId?: OpenIdSchema;
  leaderboard?: LeaderboardSchema;
  ratingLeaderboard?: RatingSchema;
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
  lestaApi: AxiosInstance,
  royalApi: AxiosInstance,
  navigate: (to: To, options?: NavigateOptions) => void,
  toastSuccess: (text: string) => void,
  toastWithError: (text: string) => void,
}

export interface ThunkConfig<T> {
  rejectValue: T,
  extra: ThunkExtraArgument,
  state: StateSchema,
}
