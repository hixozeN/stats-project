import { ILeaderboardItem } from '../types/ILeaderboardItem';

export interface LeaderboardSchema {
  isLoading: boolean;
  error?: string;
  data?: { // под зал славы с главной страницы и страницы игроков (вывод места в топе)
    winrate?: ILeaderboardItem[];
    damage?: ILeaderboardItem[];
    wn8?: ILeaderboardItem[];
    battles?: LeaderboardSchema[];
  };
  general?: ILeaderboardItem[]; // под лидерборд со страницы рейтинга
}
