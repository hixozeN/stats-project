export const getAvgFrags = (frags: number, battles: number) => {
  if (battles === 0) return 0;

  return Math.round((frags / battles) * 100) / 100;
};
