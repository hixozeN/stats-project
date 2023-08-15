import type { Preview } from '@storybook/react';
import { StyleDecorator } from 'shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const preview: Preview = {
  decorators: [
    StyleDecorator,
    ThemeDecorator(Theme.LIGHT),
  ],
  // parameters: {
  //   actions: { argTypesRegex: '^on[A-Z].*' },
  //   controls: {
  //     matchers: {
  //       color: /(background|color)$/i,
  //       date: /Date$/,
  //     },
  //   },
  // },
};

export default preview;
