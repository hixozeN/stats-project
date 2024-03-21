// export const wn8 = (data) => {
//   const avgDmg = data.damage_dealt / data.battles;
//   const avgSpot = data.spotted / data.battles;
//   const avgFrag = data.frags / data.battles;
//   const avgFrag8 = data.frags8 / data.battles;
//   const avgDef = data.dropped_capture_points / data.battles;
//   const avgWinRate = Math.floor((data.wins / data.battles) * 1000) / 100;
//   const damageRatio = data.damage_dealt / data.damage_received;
//
//   const rDamage = avgDmg / expDmg;
//   const rSpot = avgSpot / expSpot;
//   const rFrag = avgFrag / expFrag;
//   const rDef = avgDef / expDef;
//   const rWin = avgWinRate / expWinRate;
//   const rFrag8 = avgFrag8 / expFrag8;
//   const rDamageRatio = damageRatio / expDmgRatio;
//
//   const rWINc = Math.max(0, (rWin - 0.71) / (1 - 0.71));
//   const rDAMAGEc = Math.max(0, (rDamage - 0.22) / (1 - 0.22));
//
//   const rFRAGc = Math.max(Math.min(rDAMAGEc + 0.2, ((rFrag - 0.12) / (1 - 0.12))));
//   const rSPOTc = Math.max(Math.min(rDAMAGEc + 0.1, ((rSpot - 0.38) / (1 - 0.38))));
//   const rDEFc = Math.max(Math.min(rDAMAGEc + 0.1, ((rDef - 0.10) / (1 - 0.10))));
// };
