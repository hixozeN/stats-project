import { ISortClanListPlayers } from 'entities/Lesta/model/types/clans';
import { SortItemParam } from '../config/sortList';

export interface SortListPlayersSchema {
  data: ISortClanListPlayers[],
  param: SortItemParam,
  isDESC: boolean,
}
