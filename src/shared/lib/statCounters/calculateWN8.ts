//   const rDMGc = Math.max(Math.min(rDAMAGEc + 0.1, ((rSpot - 0.38) / (1 - 0.38))));
//   const rFRAGc = Math.max(Math.min(rDAMAGEc + 0.1, ((rSpot - 0.38) / (1 - 0.38))));
//   const rWINc = Math.max(Math.min(rDAMAGEc + 0.1, ((rSpot - 0.38) / (1 - 0.38))));
//   const rSPOTc = Math.max(Math.min(rDAMAGEc + 0.1, ((rSpot - 0.38) / (1 - 0.38))));
//   const rDEFc = Math.max(Math.min(rDAMAGEc + 0.1, ((rDef - 0.10) / (1 - 0.10))));

import { LestaTankStats } from 'entities/Lesta/index';
import { wn8ExpectedData } from './wn8data';
import { getAvgDamage } from './getAvgDamage';
import { getAvgSpot } from './getAvgSpot';
import { getAvgFrags } from './getAvgFrags';
import { getWinRate } from './getWinRate';
import { getDamageRatio } from './getDamageRatio';
import { getAvgDef } from './getAvgDef';

export function calculateWN8(tankData: Partial<LestaTankStats>) {
  const { tank_id, statistics } = tankData;
  const expectedData = wn8ExpectedData[tank_id];

  if (!expectedData
    || expectedData.tier < 6
    || (statistics.battles < 100 && expectedData.tier === 6)
    || (statistics.battles < 100 && expectedData.tier === 7)
    || (statistics.battles < 100 && expectedData.tier === 8)
    || (statistics.battles < 100 && (expectedData.tier === 9 || expectedData.tier === 10))) {
    return 0;
  }

  // средние показатели игрока
  const avgDmg = getAvgDamage(statistics.damage_dealt, statistics.battles);
  const avgSpot = getAvgSpot(statistics.spotted, statistics.battles);
  const avgFrags = getAvgFrags(statistics.frags, statistics.battles);
  const avgFrags8p = getAvgFrags(statistics.frags8p, statistics.battles);
  const avgWinRate = getWinRate(statistics.wins, statistics.battles);
  const avgDef = getAvgDef(statistics.dropped_capture_points, statistics.battles);
  const dmgRatio = getDamageRatio(statistics.damage_dealt, statistics.damage_received);

  // взвешенные показатели игрока
  const rDMG = avgDmg / expectedData.expDamage;
  const rSPOT = avgSpot / expectedData.expSpot;
  const rFRAG = avgFrags / expectedData.expFrag;
  // const rDEF = avgDef / expectedData.expDef;
  // const rDEF = dmgRatio / expectedData.expDamageRatio;
  const rDEF = avgDef / (statistics.dropped_capture_points / statistics.battles || 1e-4);
  const rWIN = avgWinRate / expectedData.expWinRate;

  // нормализованные значения
  const rDMGc = Math.max(0, (rDMG - 0.22) / 0.78);
  const rSPOTc = Math.max(0, Math.min(rDMGc + 0.1, (rSPOT - 0.38) / 0.62));
  const rFRAGc = Math.max(0, Math.min(rDMGc + 0.2, (rFRAG - 0.12) / 0.88));
  const rDEFc = Math.max(0, Math.min(rDMGc + 0.1, (rDEF - 0.10) / 0.9));
  const rWINc = Math.max(0, (rWIN - 0.71) / 0.29);

  // eslint-disable-next-line max-len
  const WN8 = (980 * rDMGc) + (210 * rDMGc * rFRAGc) + (155 * rFRAGc * rSPOTc) + (75 * rDEFc * rFRAGc) + (145 * Math.min(1.8, rWINc)) || 0;

  return parseFloat(WN8.toFixed(2));
}
