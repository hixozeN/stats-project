import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaUserClanData = (state: StateSchema) => state?.lestaClanData?.clan || null;
export const getLestaClanMembers = (state: StateSchema) => state?.lestaClanData?.clan?.members || [];
export const getLestaClanPlayers = (state: StateSchema) => state?.lestaClanData?.clan?.players || [];
export const getLestaClanMotto = (state: StateSchema) => state?.lestaClanData?.clan?.motto || null;
export const getLestaClanDescription = (state: StateSchema) => state?.lestaClanData?.clan?.description || null;
export const getLestaClanLogo = (state: StateSchema) => state?.lestaClanData?.clan?.emblem_set_id || null;
export const getLestaClanName = (state: StateSchema) => state?.lestaClanData?.clan?.name || null;
export const getLestaClanTag = (state: StateSchema) => state?.lestaClanData?.clan?.tag || null;
export const getClanLoadingStatus = (state: StateSchema) => state?.lestaClanData?.isLoading || false;
export const getClanNotFoundStatus = (state: StateSchema) => state?.lestaClanData?.isNotFound || false;
