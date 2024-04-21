import { TUserTanks } from 'entities/Lesta/model/types/tanks';

export const getRestTanks = (dataList: TUserTanks[], maxShoweParam: number) => dataList.length
- dataList.slice(0, maxShoweParam).length;
