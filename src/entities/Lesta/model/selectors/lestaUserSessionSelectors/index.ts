import { StateSchema } from 'app/providers/StoreProvider/index';

export const getUserSessionLoadingStatus = (state: StateSchema) => state?.lestaUserSession?.isLoading || false;
export const getUserSessionError = (state: StateSchema) => state?.lestaUserSession?.error || '';

export const getUserSessionDelta = (state: StateSchema) => state?.lestaUserSession?.data?.delta || null;
export const getUserRatingDelta = (state: StateSchema) => state?.lestaUserSession?.data?.rating || null;
export const getUserSessionStats = (state: StateSchema) => state?.lestaUserSession?.data?.statistics || null;
export const getUserSessionTanks = (state: StateSchema) => state?.lestaUserSession?.data?.tanks || [];
export const getUserSessionsDates = (state: StateSchema) => state?.lestaUserSession?.data?.meta || {};
