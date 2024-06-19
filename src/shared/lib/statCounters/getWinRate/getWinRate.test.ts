import { getWinRate } from './getWinRate';

describe('getWinRate', () => {
  test('With the correct data types', () => {
    expect(getWinRate(70, 100))
      .toBe(70);
  });

  test('When the number of battles is 0', () => {
    expect(getWinRate(0, 0)).toBe(0);
  });

  test('When the number of wins is 0', () => {
    expect(getWinRate(0, 50)).toBe(0);
  });

  test('rounds win rate to 2 decimal places', () => {
    expect(getWinRate(33, 34)).toBe(97.06);
  });
});
