interface LestaData {
  account_id: number;
}

export interface FavoritePlayer {
  lestaData: LestaData;
  _id: string;
  username: string;
  tag?: string;
  clan_id?: number;
}

export interface FavoriteClan {
  clan_id: number;
  tag: string;
  name: string;
}

export interface Favorites {
  players: FavoritePlayer[];
  clans?: FavoriteClan[];
  isLoading: boolean;
  /* Стейт под загрузку запроса добавления/удаления */
  isToggleLoading?: boolean;
}
