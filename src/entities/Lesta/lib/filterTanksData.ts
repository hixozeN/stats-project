import { LestaTankStats } from '../model/types/tanks';

export function filterTanksData(data: LestaTankStats[]): LestaTankStats[] {
  return data.filter(
    (item: LestaTankStats) => 'tankData' in item,
  );
}

// export function filterTanks(data: LestaTankStats[]): number[] {
//   return data
//     .filter((item: LestaTankStats) => 'tankData' in item && Number(item.statistics.battles) === 0)
//     .map((item1) => item1.tank_id);
// }
// const arr = [
//   81,
//   545,
//   577,
//   609,
//   1329,
//   3089,
//   3329,
//   3377,
//   3889,
//   4913,
//   5425,
//   7169,
//   9777,
//   10033,
//   10289,
//   10369,
//   10609,
//   10625,
//   10881,
//   12929,
//   13185,
//   13441,
//   13697,
//   13953,
//   14721,
//   14977,
//   15233,
//   15745,
//   18241,
//   20033,
//   20817,
//   22097,
//   22353,
//   23121,
//   23297,
//   23377,
//   24849,
//   25601,
//   25857,
//   26369,
//   26641,
//   26913,
//   27425,
//   27649,
//   28193,
//   28705,
//   64081];
