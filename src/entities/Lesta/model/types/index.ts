import { LestaUser, TUserData } from './users';
import { LestaTankStats, TUserTanks } from './tanks';
import { LestaClan } from './clans';

export type LestaSchema = {
  user?: LestaUser,
  userTanks?: LestaTankStats[],
  clan?: LestaClan,
  isLoading: boolean,
  error?: string,
  isNotFound?: boolean;
}

export type LestaData = {
  userData: TUserData,
  userTanks: TUserTanks[],
}

export type LestaTanksSchema = {
  userTanks?: TUserTanks[],
  isLoading: boolean,
  error?: string,
}
