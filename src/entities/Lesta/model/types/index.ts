import { LestaUser, TUserData } from './users';
import { LestaTankStats, TUserTanks } from './tanks';
import { LestaPrivateUserData, LestaUser } from './users';
import { LestaTankStats } from './tanks';
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

export type LestaUserDataSchema = {
  isLoading: boolean;
  isNotFound?: boolean;
  error?: string;
  personal?: LestaUser,
  private?: LestaPrivateUserData,
  rating: any;
  ratingValues: {
    ratingValue: number;
    calibration_battles_left: number;
  }
}
