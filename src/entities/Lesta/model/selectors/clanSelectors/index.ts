import { StateSchema } from 'app/providers/StoreProvider/index';

export const getLestaClanMotto = (state: StateSchema) => state?.lestaClanData?.clan?.motto || null;
export const getLestaClanDescription = (state: StateSchema) => state?.lestaClanData?.clan?.description || null;
export const getLestaClanLogo = (state: StateSchema) => state?.lestaClanData?.clan?.emblem_set_id || null;
export const getLestaClanName = (state: StateSchema) => state?.lestaClanData?.clan?.name || null;
export const getLestaClanTag = (state: StateSchema) => state?.lestaClanData?.clan?.tag || null;
export const getClanLoadingStatus = (state: StateSchema) => state?.lestaClanData?.isLoading || false;
export const getClanNotFoundStatus = (state: StateSchema) => state?.lestaClanData?.isNotFound || false;
export const getClanStatistics = (state: StateSchema) => state?.lestaClanData?.clan?.statistics || null;
export const getClanMembersCount = (state: StateSchema) => state?.lestaClanData?.clan?.members_count || 0;
export const getClanMembers = (state: StateSchema) => state?.lestaClanData?.clan?.members || [];
