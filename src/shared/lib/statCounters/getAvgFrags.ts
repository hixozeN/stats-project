export const getAvgFrags = (frags: number, battles: number) => (Math.round((frags / battles) / 100) * 100) || 0;
