import { TUserTanks } from 'entities/Lesta';

export const REGEX_SYMBOLS_FILTER = /[!@#$()«»%^&{}:;\\\-_,."`'\s]/g;

export const getSearchTanks = (value: string, tanksList: TUserTanks[]) => {
  if (value !== '') {
    return tanksList
      .filter((tank: TUserTanks) => tank?.tankData?.name?.trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(REGEX_SYMBOLS_FILTER, '')
        .includes(value.trim()
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(REGEX_SYMBOLS_FILTER, '')));
  }
  return tanksList;
};
