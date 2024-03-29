import { UserRoles } from 'entities/User';
import { LestaUserStatistics } from 'shared/api';
import { LestaTankStats } from 'entities/Lesta';
import { TUserTanks } from 'entities/Lesta/model/types/tanks/index';
import { Clan, LestaClan } from '../clans';
import { ParamData } from '../default';

export type TLestaUserData = {
  nickname: string;
  account_id: number;
  expires_at?: Date;
  access_token?: string;
}

export type LestaPrivateUserData = {
  gold: number;
  free_xp: number;
  is_premium: boolean;
  credits: number;
  premium_expires_at: null | number;
  battle_life_time: number;
  ban_info: string;
  chat_ban_time: number;
  ban_time: number;
};

interface RatingData {
  calibration_battles_left: number;
  recalibration_start_time: number;
  mm_rating: number;
  is_recalibration: boolean;
  current_season: number;
}

export type LestaUserRatingData = LestaUserStatistics & RatingData;

export type LestaUserLastSession = {
  _id: string;
  session_date: Date;
  account_id: number;
  statistics: LestaUserStatistics;
  rating: LestaUserRatingData;
};

export interface LestaUserSession {
  _id?: string;
  id: string;
  session_date: Date;
  account_id: number;
  statistics: LestaUserStatistics;
  rating: LestaUserRatingData;
  tanks: Partial<LestaTankStats>[];
}

export type LestaUser = {
  id?: string;
  username?: string;
  email?: string;
  avatar?: string;
  created_at?: Date;
  roles?: UserRoles[];
  ra_rating?: number;
  balance?: number;
  isActivated?: boolean;
  sessions?: LestaUserSession[];
  lestaData?: TLestaUserData;
  nickname: string;
  account_id: number;
  lesta_created_at: number;
  last_battle_time: number;
  statistics?: LestaUserStatistics;
  rating?: LestaUserRatingData;
  lastSession?: LestaUserSession;
  clan?: LestaClan;
  private?: LestaPrivateUserData;
  awards?: string[];
  bio?: string;
  discord?: string;
  telegram?: string;
  youtube?: string;
  vk?: string;
  accessToken?: string;
  wn8: number;
};

export type RatingValues = {
  ratingValue: number;
  calibration_battles_left: number;
};

export type TUserData = {
  private: LestaPrivateUserData;
  statistics: ParamData;
  rating: ParamData;
  ratingValues: RatingValues;
  personal: LestaUser;
  clan: Clan;
};

export type TUserSession = {
  delta: ParamData;
  statistics: ParamData;
  tanks: TUserTanks[];
}
