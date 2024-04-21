export const timeConverter = (timestamp: number) => {
  const a = new Date(timestamp * 1000);
  const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Мая', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
  const month = months[a.getMonth()];
  const date = a.getDate();
  return `${date} ${month}`;
};
