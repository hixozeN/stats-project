import { LestaClan } from 'entities/Lesta';

export const averageNumberFights = (data: LestaClan) => {
  if (!data?.players || !data?.players.length) return 0;

  let count = 0;
  const sumBattles = data.players.reduce((acc: number, item: any) => {
    if (!item.statistics.battles) {
      count += 1;
      return acc;
    }
    acc += item.statistics.battles;
    return acc;
  }, 0);

  return Math.round(sumBattles / (data.players.length - count));
};

export const avarageWinrate = (data: LestaClan) => {
  if (!data?.players || !data?.players.length) return 0;

  let count = 0;
  const sumWins = data.players.reduce((acc: number, item: any) => {
    if (!item.statistics.battles) {
      count += 1;
      return acc;
    }
    acc += ((item.statistics.wins / item.statistics.battles) * 100);
    return acc;
  }, 0);

  return (sumWins / (data.players.length - count)).toFixed(2);
};

export const averageNumberDamage = (data: LestaClan) => {
  if (!data?.players || !data?.players.length) return 0;

  let count = 0;
  const sumDamage = data.players.reduce((acc: number, item: any) => {
    if (!item.statistics.battles) {
      count += 1;
      return acc;
    }
    acc += item.statistics.damage_dealt / item.statistics.battles;
    return acc;
  }, 0);

  return Math.round(sumDamage / (data.players.length - count));
};
