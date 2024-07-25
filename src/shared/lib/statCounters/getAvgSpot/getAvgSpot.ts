export const getAvgSpot = (spotted: number, battles: number) => {
  if (battles === 0) return 0;

  return Math.round((spotted / battles) * 100) / 100;
};
