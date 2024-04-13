import { SortScheme } from '../types/sort';

export type NameSortItem = 'battles' | 'average' | 'winRate' | 'wn8' | 'lastBattle';

export interface IStatList {
  nameItem: NameSortItem;
  text: string;
  param: string;
}

export const statList: IStatList[] = [
  {
    nameItem: 'battles',
    text: 'Бои',
    param: 'battles',
  },
  {
    nameItem: 'average',
    text: 'С/У',
    param: 'avgDamage',
  },
  {
    nameItem: 'winRate',
    text: 'Винрейт',
    param: 'winRate',
  },
  {
    nameItem: 'wn8',
    text: 'WN8',
    param: 'wn8',
  },
  {
    nameItem: 'lastBattle',
    text: 'Последний бой',
    param: 'last_battle_time',
  },
];

export const sortData = ['Винрейт', 'С/У', 'WN8', 'Фильтр'];

export const clearSortData: SortScheme = statList.reduce<SortScheme>((result, item) => {
  if (item.nameItem === 'lastBattle') {
    return { ...result, [`${item.nameItem}`]: { isActive: true, isUp: false, isDown: true } };
  }
  return {
    ...result,
    [`${item.nameItem}`]: { isActive: false, isUp: false, isDown: false },
  };
}, <SortScheme>{});
