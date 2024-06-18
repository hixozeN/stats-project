import { getLastBattleTime } from './getLastBattleTime';

describe('getLastBattleTime function', () => {
  test('correctly formats dates with leading zeros', () => {
    const timestamp = 1609459200;
    expect(getLastBattleTime(timestamp)).toBe('01.01.21');
  });

  test('correctly formats dates without leading zeros', () => {
    const timestamp = 1633824000;
    expect(getLastBattleTime(timestamp)).toBe('10.10.21');
  });

  test('handles leap years correctly', () => {
    const timestamp = 1582934400;
    expect(getLastBattleTime(timestamp)).toBe('29.02.20');
  });

  test('correctly interprets the year', () => {
    const timestamp = 946684800;
    expect(getLastBattleTime(timestamp)).toBe('01.01.00');
  });
});
