import { User, UserOpenID } from 'entities/User';

export const openIdDTOConverter = (data: UserOpenID | User): User => {
  if (!data) return null;
  return {
    accessToken: data.accessToken,
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
