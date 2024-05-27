import { StateSchema } from 'app/providers/StoreProvider';

export const getSortListData = (state: StateSchema) => state?.sortListPlayers.data || [];
export const getSortListIsDESC = (state: StateSchema) => state?.sortListPlayers?.isDESC || null;
export const getSortClanListParam = (state: StateSchema) => state?.sortListPlayers?.param || '';
