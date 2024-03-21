import { LestaUser } from './users';
import { LestaTankStats } from './tanks';
import { LestaClan } from './clans';

export type LestaSchema = {
  user?: LestaUser,
  userTanks?: LestaTankStats,
  clan?: LestaClan,
  isLoading: boolean,
  error?: string,
  isNotFound?: boolean;
}

export type LestaClanSchema = {
  clan?: LestaClan,
  isLoading: boolean,
  error?: string,
  isNotFound?: boolean;
}
