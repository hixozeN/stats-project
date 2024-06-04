import { formatDate } from './formatDate';

describe('Functionality of formatDate', () => {
  test('With only first param', () => {
    expect(formatDate(new Date('02.06.24 17:19')))
      .toBe('06.02.24 17:19');
  });
  test('With both params, withoutMinutes: false', () => {
    expect(formatDate(new Date('02.06.24 17:19'), false))
      .toBe('06.02.24 17:19');
  });
  test('With both params, withoutMinutes: true', () => {
    expect(formatDate(new Date('02.06.24 17:19'), true))
      .toBe('06.02.24');
  });
  test('With invalid date input as undefined', () => {
    expect(formatDate(undefined)).toBe(null);
  });
  test('With invalid date input as null', () => {
    expect(formatDate(null)).toBe(null);
  });
  test('Correct formatting for day and month boundary', () => {
    expect(formatDate(new Date('01.01.24 00:01')))
      .toBe('01.01.24 00:01');
  });
  test('Correct formatting for date close to midnight', () => {
    expect(formatDate(new Date('02.06.24 23:59'))).toBe('06.02.24 23:59');
  });
  test('Correct handling of leap year', () => {
    expect(formatDate(new Date('02.29.24'))).toBe('29.02.24 00:00');
  });
});

describe('Return type of formatDate', () => {
  test('Returns a string', () => {
    const result = formatDate(new Date());
    expect(typeof result).toBe('string');
  });
  test('Returns null for invalid input', () => {
    const result = formatDate(undefined);
    expect(result).toBeNull();
  });
});
