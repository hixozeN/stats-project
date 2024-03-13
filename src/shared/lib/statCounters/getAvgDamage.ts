export const getAvgDamage = (damage: number, battles: number): number => {
  const result = Math.round(damage / battles);
  return result || 0;
};
