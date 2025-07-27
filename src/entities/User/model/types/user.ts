/* eslint-disable no-unused-vars */
import { LestaUserStatistics } from 'shared/api';
import { FavoriteClan, FavoritePlayer } from 'entities/Favorites';

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

export interface UserSettings {
  shouldAutoUpdateSession?: boolean;
}

export interface User {
  _id?: string;
  username: string;
  email?: string;
  lestaData: LestaUserData | null;
  avatar?: string;
  created_at?: Date;
  roles?: string[];
  bio?: string;
  discord?: string;
  vk?: string;
  telegram?: string;
  youtube?: string;
  teams?: string[];
  awards?: UserAwards[];
  isActivated?: boolean;
  accessToken?: string;
  subscribes?: FavoritePlayer[];
  clanSubscribes?: FavoriteClan[];
  settings?: UserSettings;
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
  roles: string[];
  ra_rating: number;
  balance: number;
  isActivated: boolean;
  lestaData: LestaUserData;
  password: string;
  subscribes: FavoritePlayer[];
  clanSubscribes: FavoriteClan[];
}

type AvatarAccessType = 'public' | 'roleOnly' | 'userOnly';

export interface AvatarFullData {
  _id: string;
  name: string;
  image: string;
  isBorder?: boolean;
  access?: AvatarAccessType;
  allowedRoles?: string[];
  allowedUsers?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAvatars {
  public: AvatarFullData[];
  roleOnly: AvatarFullData[];
  userOnly: AvatarFullData[];
}

export interface UserSchema {
  authData?: User;

  isLoggedIn?: boolean;
  isLoading?: boolean;
  isTokenRefreshing?: boolean;
  error?: string;
  updateProfileError?: string;

  isInitiated: boolean;
}
