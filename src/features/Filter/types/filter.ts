import { TUserTanks } from 'entities/Lesta/model/types/tanks';

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
}

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
}

export interface FilterSchema {
  data?: TUserTanks[];
  checkboxes?: Record<string, Record<string, boolean>>;
  isActiveFilter: boolean;
}
