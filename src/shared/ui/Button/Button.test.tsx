import { render, screen } from '@testing-library/react';
import { Button } from 'shared/ui/Button/Button';

describe('buttons', () => {
  test('Тест рендера кнопки', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  test('Тест темы кнопки - clear', () => {
    render(<Button theme="clear">TEST</Button>);
    expect(screen.getByText('TEST')).toHaveClass('clear');
    screen.debug();
  });

  test('Рендер кнопки с иконкой', () => {
    render(<Button theme="default" variant="save">Сохранить</Button>);

    const spanWithIcon = screen.getByTestId('btnIcon');

    expect(screen.getByText('Сохранить')).toContainElement(spanWithIcon);
    screen.debug();
  });

  test('Рендер отключенной кнопки', () => {
    render(<Button theme="default" size="size_m" disabled>Button</Button>);

    expect(screen.getByTestId('btnUiKit')).toBeDisabled();
    screen.debug();
  });

  test('Рендер лоудера в кнопке', () => {
    render(<Button theme="default" variant="save" size="size_m" isLoading>Сохранить</Button>);

    const spanWithLoader = screen.getByTestId('spanWithLoader');

    expect(screen.getByTestId('btnWithLoader')).toContainElement(spanWithLoader);
    screen.debug();
  });

  // test('Тест темы кнопки - inverted', () => {
  //   render(<Button theme={ButtonTheme.INVERTED}>TEST</Button>);
  //   expect(screen.getByText('TEST')).toHaveClass('inverted');
  // });
});
