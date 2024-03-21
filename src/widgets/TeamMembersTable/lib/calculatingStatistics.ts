export const calculatingStatistics = (wins: number, battles: number): number => (
  Math.round(((wins / battles) * 1000000) / 100) / 100 || 0
);

export const getDamage = (battles: number, damage: number): number => (
  Math.round((damage / battles)) || 0
);
