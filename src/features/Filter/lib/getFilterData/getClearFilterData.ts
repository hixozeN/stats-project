import { filterData } from '../../config/filterData';

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
