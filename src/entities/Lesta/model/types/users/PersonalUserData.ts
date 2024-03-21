export interface LestaUserStatistics {
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
  frags8p: number;
  xp: number;
  win_and_survived: number;
  survived_battles: number;
  dropped_capture_points: number;
}

export interface PersonalUserDataResponse {
  data: {
    [key: string | number]: {
      account_id: number;
      created_at: number;
      nickname: string;
      last_battle_time: number;
      statistics: {
        clan: null | Record<string, number>;
        frags: null | Record<string, number>;
        all: LestaUserStatistics;
      };
    }
  };
}
