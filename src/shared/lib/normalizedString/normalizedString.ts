import { REGEX_SYMBOLS_FILTER } from '../../consts/global';

export const getNormalizedString = (s: string) => {
  if (typeof s === 'string') {
    return s
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(REGEX_SYMBOLS_FILTER, '');
  }

  return '';
};
