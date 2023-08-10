import { render, screen } from '@testing-library/react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

describe('button', () => {
  test('Тест рендера кнопки', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  test('Тест темы кнопки - clear', () => {
    render(<Button theme={ThemeButton.CLEAR}>TEST</Button>);
    expect(screen.getByText('TEST')).toHaveClass('clear');
    screen.debug();
  });

  test('Тест темы кнопки - inverted', () => {
    render(<Button theme={ThemeButton.INVERTED}>TEST</Button>);
    expect(screen.getByText('TEST')).toHaveClass('inverted');
  });
});
