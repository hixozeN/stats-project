// export const getAvgDef = (points: number, battles: number) => (Math.round((points / battles) / 100) * 100) || 0;
export const getAvgDef = (points: number, battles: number) => {
  if (battles === 0) return 0;

  return Math.round(points / battles);
};
