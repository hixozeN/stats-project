export interface IFilterData {
  name: string;
  text: string;
  value: string[];
  param: string;
}

export const filterData = [
  {
    name: 'tier',
    text: 'Уровень',
    value: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    param: 'tankData.tier',
  },
  {
    name: 'type',
    text: 'Тип танка',
    value: ['lightTank', 'mediumTank', 'heavyTank', 'AT-SPG'],
    param: 'tankData.type',
  },
  {
    name: 'nation',
    text: 'Нация',
    value: [
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
    value: ['4', '3', '2', '1'],
    param: 'mark_of_mastery',
  },
];

// export const sortData = ['Побед', 'Ср. урон', 'WN8', 'Фильтр'];
