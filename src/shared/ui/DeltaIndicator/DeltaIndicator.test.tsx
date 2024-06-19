import { screen } from '@testing-library/react';
import { componentRender } from '../../lib/tests/componentRender/componentRender';
import { DeltaIndicator } from './DeltaIndicator';

describe.each([
  [5, 'Бои', '+5', 'delta positive'],
  [-5, 'Винрейт', '-5%', 'delta negative'],
  [0, 'Винрейт', '', 'delta'],
  [5, 'Поражения', '+5', 'delta negative'],
  ['6', 'Поражения', '+6', 'delta negative'],
  ['-6', 'Винрейт', '-6%', 'delta negative'],
  ['undefined', 'Винрейт', '', 'delta'],
  ['undefined', 'Поражения', '', 'delta'],
])(
  'Data: delta "%p", itemName "%s", expected "%s", className "%s"',
  (delta: number | string, itemName: string, result: string, classNames: string) => {
    beforeEach(() => {
      componentRender(<DeltaIndicator delta={delta} itemName={itemName} />);
    });

    test('checking the component rendering', () => {
      expect(screen.getByTestId('deltaIndicator')).toBeInTheDocument();
    });

    test(`checking the displayed text ${result}`, () => {
      expect(screen.getByTestId('deltaIndicator').textContent).toBe(result);
    });

    test(`checking for the presence of className ${classNames}`, () => {
      expect(screen.getByTestId('deltaIndicator').className).toBe(classNames);
    });
  },
);
