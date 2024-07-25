import { getDamageRatio } from './getDamageRatio';

describe('getDamageRatio function', () => {
  test('returns 0 if damage_received is 0 to avoid division by zero', () => {
    expect(getDamageRatio(1000, 0)).toBe(0);
  });

  test('calculates the correct damage ratio when damage_dealt is greater than damage_received', () => {
    expect(getDamageRatio(2000, 1000)).toBe(2.00);
  });

  test('calculates the correct damage ratio when damage_dealt is less than damage_received', () => {
    expect(getDamageRatio(500, 1000)).toBe(0.50);
  });

  test('calculates the correct damage ratio when damage_dealt equals damage_received', () => {
    expect(getDamageRatio(1000, 1000)).toBe(1.00);
  });

  test('rounds the damage ratio to two decimal places', () => {
    expect(getDamageRatio(333, 1000)).toBe(0.33); // Результат 0.333 округляется до 0.33
  });

  test('handles very small damage ratios correctly', () => {
    expect(getDamageRatio(1, 1000)).toBe(0.00); // Результат 0.001 округляется до 0.00
  });

  test('handles very large damage ratios correctly', () => {
    expect(getDamageRatio(1000000, 1)).toBe(1000000.00); // Очень большое соотношение
  });
});
