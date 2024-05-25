export type FoundClanData = {
  members_count: number;
  created_at: number;
  clan_id: number;
  tag: string;
  name: string;
  emblem_set_id?: number;
}

export type FoundPlayerData = {
  nickname: string;
  account_id: number;
  clan: FoundClanData;
}

export interface FoundData {
  players: FoundPlayerData[],
  clans: FoundClanData[],
}
