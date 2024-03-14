import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaClanPlayers = (state: StateSchema) => state?.lestaClanData?.clan?.players || [];
