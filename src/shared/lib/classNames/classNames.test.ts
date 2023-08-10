import { classNames } from 'shared/lib/classNames/classNames';

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
});
