export type SortValue = 'battles' | 'damage' | 'winrate' | 'wn8';

export interface PlayersLeaderboardParams {
  battles: number;
  limit: number;
  sortBy: SortValue;
}
