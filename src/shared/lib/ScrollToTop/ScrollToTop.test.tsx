import React from 'react';
import { ScrollToTop } from './ScrollToTop';
import { componentRender } from '../tests/componentRender/componentRender';

global.scrollTo = jest.fn();

describe('ScrollToTop', () => {
  test('Scrolls to the top on route change', () => {
    componentRender(<ScrollToTop />);
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);

    // Simulating route change and re-rendering the component with a new route
    componentRender(<ScrollToTop />, { route: '/new-path' });
    expect(global.scrollTo).toHaveBeenCalledTimes(2);
  });
});
