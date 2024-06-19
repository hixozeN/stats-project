import { ScrollToTop } from './ScrollToTop';
import { componentRender } from '../tests/componentRender/componentRender';

window.scrollTo = jest.fn();

describe('ScrollToTop', () => {
  test('Window scrollTo should be mocked correctly', () => {
    window.scrollTo(500, 100);
    expect(window.scrollTo).toHaveBeenCalledWith(500, 100);
  });

  test('Should call scrollTo(0, 0) on initial render', () => {
    componentRender(<ScrollToTop />);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  test('Should call scrollTo(0, 0) on route change', () => {
    jest.clearAllMocks();

    componentRender(<ScrollToTop />);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);

    componentRender(<ScrollToTop />, { route: '/new-path' });

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
