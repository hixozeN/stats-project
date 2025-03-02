export { favoriteReducer, favoriteActions } from './model/slice/favoritesSlice';
export type { Favorites, FavoritePlayer, FavoriteClan } from './model/types';
export {
  getFavoritePlayersState, getFavoriteClansState, isFavoritesLoading, isFavoritesToggleLoading,
} from './model/selectors';
export { addClanToFavorites } from './model/services/addClanToFavorites/addClanToFavorites';
export { removeClanFromFavorites } from './model/services/removeClanFromFavorites/removeClanFromFavorites';
export { addPlayerToFavorites } from './model/services/addPlayerToFavorites/addPlayerToFavorites';
export { removePlayerFromFavorites } from './model/services/removePlayerFromFavorites/removePlayerFromFavorites';
