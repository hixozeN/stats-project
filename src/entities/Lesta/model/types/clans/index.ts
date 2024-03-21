export interface LestaClanRecruitingOptions {
  average_battles_per_day: number;
  average_damage: number;
  battles: number;
  vehicles_level: number;
  wins_ratio: number;
}

interface LestaClanRating {
  spotted: number;
  calibration_battles_left: number;
  hits: number;
  frags: number;
  recalibration_start_time: number;
  mm_rating: number;
  wins: number;
  losses: number;
  is_recalibration: boolean;
  capture_points: number;
  battles: number;
  current_season: number;
  damage_dealt: number;
  damage_received: number;
  shots: number;
  frags8p: number;
  xp: number;
  win_and_survived: number;
  survived_battles: number;
  dropped_capture_points: number;
}

interface LestaClanStatistics {
  battles: number;
  capture_points: number;
  damage_dealt: number;
  damage_received: number;
  spotted: number;
  max_frags_tank_id: number;
  hits: number;
  frags: number;
  max_xp: number;
  max_xp_tank_id: number;
  wins: number;
  losses: number;
  max_frags: number;
  shots: number;
  xp: number;
  win_and_survived: number;
  survived_battles: number;
  dropped_capture_points: number;
}

export interface LestaClanPlayer {
  nickname?: string;
  account_id: number;
  lesta_created_at?: number;
  last_battle_time?: number;
  rating?: LestaClanRating;
  statistics?: LestaClanStatistics;
  wn8?: number;
}

export interface LestaClanMember {
  account_id: number;
  account_name?: string;
  joined_at?: number;
  role?: string;
}

export type LestaClanUser = {
  account_id: number;
  account_name?: string;
  joined_at?: number;
  role?: string;
  nickname?: string;
  lesta_created_at?: number;
  last_battle_time?: number;
  rating?: LestaClanRating;
  statistics?: LestaClanStatistics;
  wn8?: number;
};

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
  players: LestaClanPlayer[];
};
