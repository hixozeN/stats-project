export enum UserRoles {
  ADMIN = 'Admin',
  MODERATOR = 'Moderator',
  JUDGE = 'Judge',
  USER = 'User',
}

export type UserAwards = Record<string, string>;

export interface User {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  regDate?: Date;
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
