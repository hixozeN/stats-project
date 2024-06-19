import { getAvgSpot } from 'shared/lib/statCounters/getAvgSpot/getAvgSpot';

describe('getAvgSpot', () => {
  test('With the correct data types', () => {
    expect(getAvgSpot(70, 100))
      .toBe(0.7);
  });

  test('When the number of battles is 0', () => {
    expect(getAvgSpot(0, 0)).toBe(0);
  });

  test('When the number of wins is 0', () => {
    expect(getAvgSpot(0, 50)).toBe(0);
  });

  test('rounds win rate to 2 decimal places', () => {
    expect(getAvgSpot(33, 34)).toBe(0.97);
  });
});
