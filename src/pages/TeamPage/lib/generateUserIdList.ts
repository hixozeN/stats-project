import { LestaClanMember } from 'entities/Lesta/model/types/clans';

export const generateUserIdList = (arr: LestaClanMember[]): number[] => {
  const result: number[] = [];
  if (!arr.length) return [];

  arr.forEach((item) => result.push(item.account_id));
  return result;
};
