import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaUserLastBattleTime = (state: StateSchema) => state?.lesta?.user?.last_battle_time || null;
