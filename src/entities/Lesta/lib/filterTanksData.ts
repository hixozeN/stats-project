import { TUserTanks } from '../model/types/tanks';

export function filterTanksData(data: TUserTanks[]): TUserTanks[] {
  return data.filter(
    (item: TUserTanks) => 'tankData' in item,
  );
}
