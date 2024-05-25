export interface FilterTanks {
  nameParam: 'tier' | 'type' | 'nation' | 'mark_of_mastery';
  values: string[];
  param: string;
}

export const filterData: FilterTanks[] = [
  {
    nameParam: 'tier',
    values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    param: 'tankData.tier',
  },
  {
    nameParam: 'type',
    values: ['lightTank', 'mediumTank', 'heavyTank', 'AT-SPG'],
    param: 'tankData.type',
  },
  {
    nameParam: 'nation',
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
    nameParam: 'mark_of_mastery',
    values: ['4', '3', '2', '1'],
    param: 'statistics.mark_of_mastery',
  },
];
