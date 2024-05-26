import { REGEX_SYMBOLS_FILTER } from 'shared/consts/global';

export const getNormalizedString = (s: string) => s
  .trim()
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(REGEX_SYMBOLS_FILTER, '');
