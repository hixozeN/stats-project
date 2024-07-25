export const getDamageRatio = (damage_dealt: number, damage_received: number) => {
  if (damage_received === 0) return 0;

  return Math.round((damage_dealt / damage_received) * 100) / 100;
};
