import { ParamData } from '../../model/types/default';
import { LestaTankStats, TUserTanks } from './tanks';
import {
  LestaPrivateUserData, LestaUser, TUserData, TUserSession,
} from './users';
import { Clan, LestaClan } from './clans';

export type LestaSchema = {
  user?: LestaUser;
  userTanks?: LestaTankStats[];
  clan?: LestaClan;
  isLoading: boolean;
  error?: string;
  isNotFound?: boolean;
}

export type LestaData = {
  userData: TUserData;
  userTanks: TUserTanks[];
}

export type LestaTanksSchema = {
  userTanks?: TUserTanks[];
  isLoading: boolean;
  error?: string;
}

export type LestaUserDataSchema = {
  isLoading: boolean;
  isNotFound?: boolean;
  error?: string;
  personal?: LestaUser;
  private?: LestaPrivateUserData;
  statistics: ParamData;
  rating: ParamData;
  ratingValues: {
    ratingValue: number;
    calibration_battles_left: number;
  };
  clan: Clan;
}

export type LestaUserSessionSchema = {
  isLoading: boolean;
  isNotFound?: boolean;
  error?: string;
  data: TUserSession;
}
