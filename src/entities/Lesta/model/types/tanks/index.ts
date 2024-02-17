import { LestaUserStatistics } from 'shared/api';

export type LestaTankData = {
  _id: string;
  tank_id: number;
  name: string;
  type: string;
  tier: number;
  nation: string;
  is_premium: boolean;
  image: string;
  image_preview: string;
  description: string;
};

export type LestaTankStats = {
  tank_id: number;
  tankData?: LestaTankData;
  last_battle_time: number;
  mark_of_mastery: number;
  battle_life_time: number;
  // statistics: Partial<LestaUserStatistics>,
  statistics: LestaUserStatistics;
};
