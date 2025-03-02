import { FavoriteClan, FavoritePlayer } from 'entities/Favorites';

export interface FavoritesData {
  players: FavoritePlayer[];
  clans: FavoriteClan[];
}

/**
 * GET запрос на список избранных.
 */
export interface FavoritesDataResponse {
  items: FavoritesData;
}

/**
 * PUT запрос с добавлением в избранное.
 */
export interface AddPlayerToFavoritesResponse {
  items: FavoritesData['players'];
}

/**
 * DEL запрос с удалением из избранного.
 */
export interface DeletePlayerFromFavoritesResponse {
  items: FavoritesData['players'];
}

/**
 * PUT запрос с добавлением в избранное.
 */
export interface AddClanToFavoritesResponse {
  items: FavoritesData['clans'];
}

/**
 * DEL запрос с удалением из избранного.
 */
export interface DeleteClanFromFavoritesResponse {
  items: FavoritesData['clans'];
}
