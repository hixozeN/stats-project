export interface IFavoritesData {
  // lestaData: { account_id: number },
  // username: string,
  // _id: string,
  account_id: number,
  name?: string,
  link?: string,
  tag?: string | null,
}

export interface IFavoritesPlayers {
  players: IFavoritesData[],
  message: string,
  isLoading: boolean,
}
