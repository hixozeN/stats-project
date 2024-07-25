import { getAvgDamage } from './getAvgDamage';

describe('getAvgDamage', () => {
  test('With the correct data types', () => {
    expect(getAvgDamage(1000, 100))
      .toBe(10);
  });

  test('When the number of battles is 0', () => {
    expect(getAvgDamage(1000, 0)).toBe(0);
  });

  test('When the number of damage is 0', () => {
    expect(getAvgDamage(0, 5)).toBe(0);
  });

  test('With fractional damage per battle', () => {
    expect(getAvgDamage(1000, 3)).toBe(Math.round(1000 / 3));
  });
});
