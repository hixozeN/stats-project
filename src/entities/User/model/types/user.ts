/* eslint-disable no-unused-vars */
import { LestaUserStatistics } from 'shared/api';

export enum UserRoles {
  ADMIN = 'Admin',
  MODERATOR = 'Moderator',
  JUDGE = 'Judge',
  USER = 'User',
}

export interface LestaUserData {
  nickname?: string;
  account_id?: number;
  created_at?: number;
  last_battle_time?: number;
  expires_at?: number;
  access_token?: string;
  statistics?: LestaUserStatistics;
}

export type LestaOpenAuthData = {
  status: string;
  access_token: string;
  nickname: string;
  account_id: number;
  expires_at: number;
}

export type UserAwards = Record<string, string>;

export interface User {
  _id?: string;
  username: string;
  email?: string;
  lestaData: LestaUserData | null;
  avatar?: string;
  created_at?: Date;
  roles?: UserRoles[];
  bio?: string;
  discord?: string;
  vk?: string;
  telegram?: string;
  youtube?: string;
  teams?: string[];
  awards?: UserAwards[];
  isActivated?: boolean;
  accessToken?: string;
}

export interface UserOpenID {
  accessToken: string;
  refreshToken: string;
  _id: string;
  id: string;
  username: string;
  email: string;
  avatar: string;
  created_at: Date;
  roles: UserRoles[];
  ra_rating: number;
  balance: number;
  isActivated: boolean;
  lestaData: LestaUserData;
  password: string;
}

export interface UserSchema {
  authData?: User;

  isLoggedIn?: boolean;
  isLoading?: boolean;
  isTokenRefreshing?: boolean;
  error?: string;

  isInitiated: boolean;
}
