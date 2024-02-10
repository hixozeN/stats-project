import { StateSchema } from 'app/providers/StoreProvider/index';

export const getUserSocialLinks = (state: StateSchema) => ({
  vk: state?.lesta?.user?.vk || null,
  discord: state?.lesta?.user?.discord || null,
  telegram: state?.lesta?.user?.telegram || null,
  youtube: state?.lesta?.user?.youtube || null,
});
