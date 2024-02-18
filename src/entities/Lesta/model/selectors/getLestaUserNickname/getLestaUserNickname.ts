import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaUserNickname = (state: StateSchema) => state?.lesta?.user?.nickname
    || state?.user?.authData?.username
    || '';
