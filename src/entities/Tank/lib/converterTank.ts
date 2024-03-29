const lastBattleTime = (time: number) => new Date(time * 1000);
const formatter = (time: number) => new Intl.DateTimeFormat('ru').format(lastBattleTime(time));

const getLevelRoman = (level: number) => [
  { value: 10, char: 'X' },
  { value: 9, char: 'IX' },
  { value: 5, char: 'V' },
  { value: 4, char: 'IV' },
  { value: 1, char: 'I' },
].reduce((result, currentValue) => {
  while (level >= currentValue.value) {
    result += currentValue.char;
    level -= currentValue.value;
  }

  return result;
}, '');

export { formatter, getLevelRoman };
