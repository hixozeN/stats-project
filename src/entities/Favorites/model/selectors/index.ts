import { StateSchema } from 'app/providers/StoreProvider';

// export const getFavoritesClansState = (state: StateSchema) => state?.favoritesPlayers?.clans || [];
export const getFavoritesPlayersState = (state: StateSchema) => state?.favoritesPlayers?.players || [];
