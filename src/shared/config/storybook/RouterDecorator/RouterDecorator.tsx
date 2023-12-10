/*
  DEPRECATED DECORATOR!!!
  Use now 'withRouter' from 'storybook-addon-react-router-v6' package!
 */
import { StoryFn } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (Story: StoryFn) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);
