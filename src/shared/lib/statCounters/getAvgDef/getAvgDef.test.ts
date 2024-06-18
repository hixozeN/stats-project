import { getAvgDef } from './getAvgDef';

describe('getAvgDef', () => {
  test('With the correct data types', () => {
    expect(getAvgDef(1000, 100))
      .toBe(10);
  });

  test('When the number of battles is 0', () => {
    expect(getAvgDef(1000, 0)).toBe(0);
  });

  test('When the number of damage is 0', () => {
    expect(getAvgDef(0, 5)).toBe(0);
  });

  test('With fractional damage per battle', () => {
    expect(getAvgDef(1000, 3)).toBe(Math.round(1000 / 3));
  });
});
