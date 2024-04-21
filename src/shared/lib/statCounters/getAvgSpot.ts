export const getAvgSpot = (spotted: number, battles: number) => {
  const result = Math.round((spotted / battles) * 100) / 100;

  return result || 0;
};
