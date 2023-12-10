import { render, screen } from '@testing-library/react';
import { Header } from 'widgets/Header/ui/Header';

describe('header', () => {
  test('Тест рендера хедера', () => {
    render(<Header />);
    expect(screen.getByDisplayValue('app')).toBeInTheDocument();
  });
});
