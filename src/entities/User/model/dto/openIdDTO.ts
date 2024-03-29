import { User, UserOpenID } from '../types/user';

export const openIdDTO = (data: UserOpenID): User => {
  if (!data) return null;
  return {
    _id: data._id,
    username: data.username,
    email: data.email,
    lestaData: data.lestaData,
    avatar: data.avatar,
    created_at: data.created_at,
    roles: data.roles,
    isActivated: data.isActivated,
  };
};
