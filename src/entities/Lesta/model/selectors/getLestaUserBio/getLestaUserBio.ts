import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaUserBio = (state: StateSchema) => state?.lesta?.user?.bio
  || 'Игрок еще не рассказал ничего о себе, но поделился своими показателями 🚀';
