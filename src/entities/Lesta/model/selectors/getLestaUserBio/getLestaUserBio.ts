import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaUserBio = (state: StateSchema) => state?.lesta?.user?.bio
  || 'Игрок предпочитает не рассказывать о себе, а показывать результаты 🚀';
