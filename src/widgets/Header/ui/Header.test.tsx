import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Header } from 'widgets/Header/ui/Header';

describe('header', () => {
  test('Тест рендера хедера', () => {
    componentRender(<Header />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
