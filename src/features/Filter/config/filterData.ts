export interface FilterTanks {
  nameParam: string;
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

export const getFilterItem = (tab: number) => (tab === 1
  ? filterData.filter((item) => item.nameParam !== 'mark_of_mastery')
  : filterData);

export const clearFiterData = filterData.reduce((result, item) => {
  const value = item.values.reduce(
    (resultInner, itemInner) => ({
      ...resultInner,
      [`${itemInner}`]: false,
    }),
    {},
  );

  return {
    ...result,
    [`${item.param}`]: value,
  };
}, <Record<string, Record<string, boolean>>>{});
