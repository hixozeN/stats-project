import { screen } from '@testing-library/react';
import { componentRender } from '../../lib/tests/componentRender/componentRender';
import { DeltaIndicator } from './DeltaIndicator';

describe.each([
  [5, 'Бои', 'class', '+5', 'delta class default positive'],
  [-5, 'Винрейт', '', '-5%', 'delta default negative'],
  [0, 'Винрейт', '', '', 'delta default'],
  [5, 'Поражения', '', '+5', 'delta default negative'],
  ['6', 'Поражения', 'class', '+6', 'delta class default negative'],
  ['-6', 'Винрейт', '', '-6%', 'delta default negative'],
  ['undefined', 'Винрейт', '', '', 'delta default'],
  ['undefined', 'Поражения', '', '', 'delta default'],
])(
  'Data: delta "%p", itemName "%s", class "%s", expected "%s", className "%s"',
  (delta: number | string, itemName: string, className: string, result: string, classNames: string) => {
    beforeEach(() => {
      componentRender(<DeltaIndicator delta={delta} itemName={itemName} className={className} />);
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
