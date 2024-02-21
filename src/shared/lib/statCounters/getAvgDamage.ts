export const getAvgDamage = (damage: number, battles: number): number => {
  const result = Math.floor(damage / battles);
  return result || 0;
};
