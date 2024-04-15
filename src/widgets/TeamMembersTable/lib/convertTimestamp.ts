export const convertTimestamp = (timestamp: number) => {
  const d = new Date(timestamp * 1000);
  const yyyy = d.getFullYear();
  const mm = (`0${d.getMonth() + 1}`).slice(-2);
  const dd = (`0${d.getDate()}`).slice(-2);

  const time = `${dd}.${mm}.${yyyy}`;
  return time;
};
