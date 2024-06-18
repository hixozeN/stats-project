export const getAvgDamage = (damage: number, battles: number): number => {
  if (battles === 0) return 0;

  return Math.round(damage / battles);
};
