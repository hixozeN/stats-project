import { getNormalizedString } from './normalizedString';

describe('normalizedString', () => {
  test('Return empty string with undefined value', () => {
    expect(getNormalizedString(undefined))
      .toBe('');
  });

  test('Return empty string with null value', () => {
    expect(getNormalizedString(null))
      .toBe('');
  });

  test('Return empty string with array value', () => {
    // @ts-ignore
    expect(getNormalizedString([]))
      .toBe('');
  });

  test('Return empty string with obj value', () => {
    // @ts-ignore
    expect(getNormalizedString({ name: 'Name' }))
      .toBe('');
  });

  test('Normalized name', () => {
    expect(getNormalizedString('Löwe'))
      .toBe('lowe');
  });

  test('Lower case without spaces and symbols', () => {
    expect(getNormalizedString('    !!"Bat.-Châtillon" «25&t»_    '))
      .toBe('batchatillon25t');
  });
});
