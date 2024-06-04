import { classNames } from '../../lib/classNames/classNames';

describe('classNames', () => {
  test('With only first param', () => {
    expect(classNames('test'))
      .toBe('test');
  });

  test('With additional class param', () => {
    const expected = 'test additional';
    expect(classNames('test', {}, ['additional']))
      .toBe(expected);
  });

  test('With all params', () => {
    const expected = 'test additional hidden';
    expect(classNames('test', { hidden: true }, ['additional']))
      .toBe(expected);
  });

  test('With false mod', () => {
    const expected = 'test additional hidden';
    expect(classNames('test', { visible: false, hidden: true }, ['additional']))
      .toBe(expected);
  });

  test('With undefined mod', () => {
    const expected = 'test additional hidden';
    expect(classNames('test', { visible: false, hidden: true, hovered: undefined }, ['additional']))
      .toBe(expected);
  });

  test('With multiple additional classes and mods', () => {
    const expected = 'test additional1 additional2 hidden disabled';
    expect(classNames('test', { hidden: true, disabled: true }, ['additional1', 'additional2']))
      .toBe(expected);
  });

  test('With empty strings or arrays as params', () => {
    const expected = 'test';
    expect(classNames('test', {}, ['', undefined, null]))
      .toBe(expected);
  });

  test('Maintains the order of classes', () => {
    const expected = 'test additional1 additional2 hidden';
    expect(classNames('test', { hidden: true }, ['additional1', 'additional2']))
      .toBe(expected);
  });

  test('No duplication of classes', () => {
    const expected = 'test additional hidden';
    expect(classNames('test', { hidden: true }, ['additional', 'additional']))
      .toBe(expected);
  });

  test('Ignores non-boolean and non-undefined mods', () => {
    const expected = 'test hidden';
    expect(classNames('test', { hidden: true, size: 'large', color: 12345 }, []))
      .toBe(expected);
  });
});
