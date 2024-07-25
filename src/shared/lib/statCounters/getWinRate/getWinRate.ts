export const getWinRate = (wins: number, battles: number): number => {
  if (battles === 0) return 0;

  const winrate = wins / battles;
  return Math.round(((winrate) * 1000000) / 100) / 100;
};
