import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaUserPrivateData = (state: StateSchema) => {
  if (state?.lesta?.user?.private) {
    return {
      premium: state?.lesta?.user?.private?.premium_expires_at || null,
      gold: state?.lesta?.user?.private?.gold || null,
      credits: state?.lesta?.user?.private?.credits || null,
      freeXp: state?.lesta?.user?.private?.free_xp || null,
    };
  }
  return null;
};
