import { UserRoles } from 'entities/User/index';
import { LestaUserStatistics } from 'shared/api/index';
import { LestaClan } from '../clans/index';

export type TLestaUserData = {
  nickname: string;
  account_id: number;
  expires_at?: Date;
  access_token?: string;
}

type LestaPrivateUserData = {
  gold: number,
  free_xp: number,
  is_premium: boolean,
  credits: number,
  premium_expires_at: null | number,
  battle_life_time: number,
  ban_info: string,
  chat_ban_time: number,
  ban_time: number
}

interface RatingData {
  calibration_battles_left: number,
  recalibration_start_time: number,
  mm_rating: number,
  is_recalibration: boolean,
  current_season: number,
}

export type LestaUserRatingData = LestaUserStatistics & RatingData;

export type LestaUserLastSession = {
  _id: string;
  session_date: Date;
  account_id: number;
  statistics: LestaUserStatistics;
  rating: LestaUserRatingData;
}

export type LestaUser = {
  id?: string,
  username?: string,
  email?: string,
  avatar?: string,
  created_at?: Date,
  roles?: UserRoles[],
  ra_rating?: number,
  balance?: number,
  isActivated?: boolean,
  sessions?: string[],
  lestaData?: TLestaUserData,
  nickname: string,
  account_id: number,
  lesta_created_at: number,
  last_battle_time: number,
  statistics?: LestaUserStatistics,
  rating?: LestaUserRatingData,
  lastSession?: LestaUserLastSession,
  clan?: LestaClan,
  private?: LestaPrivateUserData,
  awards?: string[],
  bio?: string;
  discord?: string;
  telegram?: string;
  youtube?: string;
  vk?: string;
};
