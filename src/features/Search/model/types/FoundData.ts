export type FoundPlayerData = {
  nickname: string,
  account_id: number,
}

export type FoundClanData = {
  members_count: number;
  created_at: number;
  clan_id: number;
  tag: string;
  name: string;
}

export interface FoundData {
  players: FoundPlayerData[],
  clans: FoundClanData[],
}
