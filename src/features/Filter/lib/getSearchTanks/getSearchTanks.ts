import { TUserTanks } from 'entities/Lesta';
import { getNormalizedString } from 'shared/lib/normalizedString/normalizedString';

export const getSearchTanks = (value: string, tankList: TUserTanks[]):TUserTanks[] => {
  if (value !== '') {
    return tankList
      .filter((tank: TUserTanks) => getNormalizedString(tank?.tankData?.name)
        .includes(getNormalizedString(value)));
  }
  return tankList;
};
