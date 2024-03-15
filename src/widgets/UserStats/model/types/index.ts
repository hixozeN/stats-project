export interface StatsListItem {
  value: number | string;
  label: string;
    // 'battles'
    // | 'winRate'
    // | 'avgDamage'
    // | 'wn8'
    // | 'wins'
    // | 'losses'
    // | 'draws'
    // | 'last_battle_time'
    // | 'session_start_time';
  delta?: number | string;
}
