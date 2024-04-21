import { LestaUserStatistics } from 'shared/api';
import { ParamData } from '../default';

export type LestaTankData = {
  _id: string;
  tank_id: number;
  name: string;
  type: string;
  tier: number;
  nation: string;
  is_premium: boolean;
  is_collectible: boolean;
  image: string;
  image_preview: string;
  description: string | null;
};

export type LestaTankStats = {
  _id?: string;
  tank_id: number;
  tankData?: LestaTankData;
  last_battle_time: number;
  mark_of_mastery: number;
  battle_life_time: number;
  statistics: Partial<LestaUserStatistics>,
  wn8: number;
  battlesToShowWN8: number;
};

export type TUserTanks = {
  tank_id: number;
  tankData: LestaTankData;
  statistics: ParamData;
};
