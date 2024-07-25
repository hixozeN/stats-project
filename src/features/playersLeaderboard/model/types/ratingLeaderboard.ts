// Интерфейс для лидерборда от нашей БД
export interface RatingItem {
  nickname: string;
  account_id: number;
  battles: number;
  winRate: number;
  avgDamage: number;
  wn8: number;
  wins: number;
  losses: number;
  draws: number;
  clan?: {
    name: string;
    tag: string;
    clan_id: number;
    role: string;
  };
  rating: {
    battles: number;
    winRate: number;
    avgDamage: number;
    ratingValue: number;
    wins: number;
    losses: number;
    draws: number;
    current_season: number;
  };
  position: number;
}

// Интерфейс для данных от апи лесты
export interface RatingItemFromLesta {
  spa_id: number;
  mmr: number;
  season_number: number;
  calibrationBattlesLeft: number;
  number: number;
  percentile: number;
  skip: boolean;
  updated_at: string;
  score: number;
  nickname: string;
  clan_tag?: string;
  clan_name?: string;
}

export interface RatingNeighbors {
  player: RatingItemFromLesta;
  neighbors: RatingItemFromLesta[];
}

export interface RatingLeaderboardParams {
  league: number;
}

export interface RatingNeighborParams {
  id: number;
  neighbors?: number;
}

export interface VehicleRewardInfo {
  id?: number;
  name?: string;
  nation?: string;
  subnation?: string;
  use_subnation_flag?: false;
  type_slug?: string;
  level?: number;
  roman_level?: string;
  user_string?: string;
  image_url?: string;
  preview_image_url?: string;
  is_premium?: boolean;
  is_collectible?: boolean;
}

export interface StuffRewardInfo {
  name?: string;
  count?: number,
  title?: string;
  image_url?: string;
  sizes?: Record<string, string>,
  type?: 'stuff';
}

interface RatingReward {
  type: 'vehicle' | 'stuff';
  vehicle?: VehicleRewardInfo;
  stuff: null | StuffRewardInfo;
  from_position: number;
  to_position: number;
  count: number;
}

interface LeagueInfo {
  title: string;
  small_icon: string;
  big_icon: string;
  background: string;
  index: number;
  percentile: number;
}

export interface RewardData {
  title: string;
  image: string;
  type: 'vehicle' | 'stuff';
  count?: number;
}

export interface SeasonInfo {
  title: string;
  icon: string | null;
  start_at: string;
  finish_at: string;
  current_season: number;
  updated_at: string;
  count: number;
  rewards: RatingReward[];
  leagues: LeagueInfo[];
}
