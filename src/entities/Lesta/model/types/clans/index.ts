export interface LestaClanRecruitingOptions {
  average_battles_per_day: number;
  average_damage: number;
  battles: number;
  vehicles_level: number;
  wins_ratio: number;
}

export interface LestaPlayerStatistics {
  avgDamage: number;
  battles: number;
  draws: number;
  last_battle_time: number;
  losses: number;
  winRate: number;
  wins: number;
  wn8: number;
}

export interface LestaPlayerRating {
  avgDamage: number;
  battles: number;
  calibration_battles_left: number;
  draws: number;
  last_battle_time: number;
  losses: number;
  ratingValue: number;
  winRate: number;
  wins: number;
  wn8: number;
}

export interface ISortClanListPlayers {
  account_id: number;
  joined_at: number;
  nickname: string;
  rating: LestaPlayerRating;
  role: string;
  avgDamage: number;
  avgRating: number;
  battles: number;
  winRate: number;
  wn8: number;
  [key:string]: any;
}

export interface LestaClanStatistics {
  avgDamage: number;
  avgRating: number;
  battles: number;
  winRate: number;
  wn8: number;
}

export interface LestaClanMember {
  account_id: number;
  joined_at: number;
  nickname: string;
  rating: LestaPlayerRating;
  role: string;
  statistics: LestaPlayerStatistics;
}

export type LestaClan = {
  clan_id: number;
  created_at: number;
  creator_id: number;
  creator_name: string;
  description: string;
  emblem_set_id: number;
  is_clan_disbanded: boolean;
  leader_id: number;
  leader_name: string;
  members: LestaClanMember[];
  members_count: number;
  motto: string;
  name: string;
  old_name: string;
  old_tag: string;
  recruiting_options: LestaClanRecruitingOptions;
  recruiting_policy: string;
  renamed_at: number;
  tag: string;
  updated_at: number;
  statistics: LestaClanStatistics;
};

export type Clan = {
  name: string;
  tag: string;
  clan_id: number;
  role: string;
};
