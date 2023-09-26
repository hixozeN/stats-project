import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';

describe('Sidebar', () => {
  test('Тест рендера сайдбара', () => {
    componentRender(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('Тест тоггла сайдбара', () => {
    componentRender(<Sidebar />);
    const toggleBtn = screen.getByTestId('sidebar-toggle');
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    // есть класс свернутого сайдбара
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    fireEvent.click(toggleBtn);
    // нет класса свернутого сайдбара после клика по кнопке свернуть
    expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');
  });
});
