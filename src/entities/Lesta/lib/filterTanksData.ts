import { LestaTankStats } from '../model/types/tanks';

export function filterTanksData(data: LestaTankStats[]): LestaTankStats[] {
  return data.filter(
    (item: LestaTankStats) => 'tankData' in item && Number(item.statistics.battles) !== 0,
  );
}
