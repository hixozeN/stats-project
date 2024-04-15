interface Clan {
  name: string;
  tag: string;
  clan_id: number;
  role: string;
}

export interface ILeaderboardItem {
  nickname: string;
  account_id: number;
  battles: number;
  winRate: number;
  avgDamage: number;
  wn8: number;
  wins: number;
  losses: number;
  draws: number;
  clan: Clan;
}
