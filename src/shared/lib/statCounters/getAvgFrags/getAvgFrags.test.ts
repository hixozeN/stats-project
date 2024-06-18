import { getAvgFrags } from './getAvgFrags';

describe('getAvgFrags', () => {
  test('With the correct data types', () => {
    expect(getAvgFrags(70, 100))
      .toBe(0.7);
  });

  test('When the number of battles is 0', () => {
    expect(getAvgFrags(0, 0)).toBe(0);
  });

  test('When the number of wins is 0', () => {
    expect(getAvgFrags(0, 50)).toBe(0);
  });

  test('rounds win rate to 2 decimal places', () => {
    expect(getAvgFrags(33, 34)).toBe(0.97);
  });
});
