import { StateSchema } from 'app/providers/StoreProvider';

export const getFavoritePlayersState = (state: StateSchema) => state?.favorites?.players || [];
export const getFavoriteClansState = (state: StateSchema) => state?.favorites?.clans || [];
export const isFavoritesLoading = (state: StateSchema) => state?.favorites?.isLoading || false;
export const isFavoritesToggleLoading = (state: StateSchema) => state?.favorites?.isToggleLoading || false;
