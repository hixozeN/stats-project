import { ILeaderboardItem } from '../types/ILeaderboardItem';

export type SortValue = 'battles' | 'damage' | 'winrate' | 'wn8';

export interface LeaderboardSchema {
  isLoading: boolean;
  error?: string;
  data?: { // под зал славы с главной страницы и страницы игроков (вывод места в топе)
    winrate?: ILeaderboardItem[];
    damage?: ILeaderboardItem[];
    wn8?: ILeaderboardItem[];
    battles?: LeaderboardSchema[];
  };
  general?: ILeaderboardItem[]; // под лидерборд с нашим топом игроков
  generalFilters?: {
    battles: number;
    sortBy: SortValue;
  };
  ratingFilters?: {
    page: number;
    count: number;
    league: number;
  }
}
