export const getDamageRatio = (damage_dealt: number, damage_received: number) => {
  const result = Math.round((damage_dealt / damage_received) / 100) * 100;
  return result || 0;
};
