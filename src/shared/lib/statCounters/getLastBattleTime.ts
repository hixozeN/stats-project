export const getLastBattleTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() % 100;
  // const hours = date.getHours();
  // const minutes = date.getMinutes();
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  return `${formattedDay}.${formattedMonth}.${year}`;
};
