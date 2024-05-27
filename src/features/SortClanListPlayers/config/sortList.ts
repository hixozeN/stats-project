type SortItemName = 'Боёв' | 'Винрейт' | 'Урон' | 'WN8' | 'В бою' | 'В клане';
export type SortItemParam = 'battles' | 'winRate' | 'avgDamage' | 'wn8' | 'last_battle_time' | 'joined_at';

export interface ISortList {
  name: SortItemName;
  param: SortItemParam;
}

export const sortList: ISortList[] = [
  {
    name: 'Боёв',
    param: 'battles',
  },
  {
    name: 'Винрейт',
    param: 'winRate',
  },
  {
    name: 'Урон',
    param: 'avgDamage',
  },
  {
    name: 'WN8',
    param: 'wn8',
  },
  {
    name: 'В бою',
    param: 'last_battle_time',
  },
  {
    name: 'В клане',
    param: 'joined_at',
  },
];
