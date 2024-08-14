export interface IFavoritesData {
  id: number,
  name?: string,
  link?: string,
  tag?: string | null,
}

export interface IFavoritesPlayers {
  players: number[],
  message: string,
}
