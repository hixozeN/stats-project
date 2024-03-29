export interface FilterTanks {
  name: string;
  text: string;
  values: string[];
  param: string;
}

export const filterData: FilterTanks[] = [
  {
    name: 'tier',
    text: 'Уровень',
    values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    param: 'tankData.tier',
  },
  {
    name: 'type',
    text: 'Тип танка',
    values: ['lightTank', 'mediumTank', 'heavyTank', 'AT-SPG'],
    param: 'tankData.type',
  },
  {
    name: 'nation',
    text: 'Нация',
    values: [
      'uk',
      'germany',
      'china',
      'european',
      'other',
      'ussr',
      'usa',
      'france',
      'japan',
    ],
    param: 'tankData.nation',
  },
  {
    name: 'mastery',
    text: 'Классность',
    values: ['4', '3', '2', '1'],
    param: 'mark_of_mastery',
  },
];

// export const sortData = ['Побед', 'Ср. урон', 'WN8', 'Фильтр'];
