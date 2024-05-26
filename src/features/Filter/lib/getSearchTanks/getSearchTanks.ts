import { TUserTanks } from 'entities/Lesta';

export const REGEX_SYMBOLS_FILTER = /[!@#$()«»%^&{}:;\\\-_,."`'\s]/g;

const getNormalizedString = (s: string) => s
  .trim()
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(REGEX_SYMBOLS_FILTER, '');

export const getSearchTanks = (value: string, tankList: TUserTanks[]):TUserTanks[] => {
  if (value !== '') {
    return tankList
      .filter((tank: TUserTanks) => getNormalizedString(tank?.tankData?.name)
        .includes(getNormalizedString(value)));
  }
  return tankList;
};
