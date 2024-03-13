// export const getAvgDef = (points: number, battles: number) => (Math.round((points / battles) / 100) * 100) || 0;
export const getAvgDef = (points: number, battles: number) => points / battles;
