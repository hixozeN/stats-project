/* eslint-disable no-unused-vars */
import { LestaUserStatistics } from 'shared/api';

export enum UserRoles {
  ADMIN = 'Admin',
  MODERATOR = 'Moderator',
  JUDGE = 'Judge',
  USER = 'User',
}

export interface LestaUserData {
  nickname: string;
  account_id: number;
  created_at: number;
  last_battle_time: number;
  expires_at?: number;
  access_token?: string;
  statistics: LestaUserStatistics;
}

export type UserAwards = Record<string, string>;

export interface User {
  _id?: string;
  username: string;
  email?: string;
  lestaData: LestaUserData | null;
  avatar?: string;
  created_at?: number;
  roles?: UserRoles[];
  bio?: string;
  discord?: string;
  teams?: string[];
  awards?: UserAwards[];
}

export interface UserSchema {
  authData?: User;

  isLoggedIn: boolean;
}
