import type { Preview } from '@storybook/react';
import { StyleDecorator } from 'shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { RouterDecorator } from 'shared/config/storybook/RouterDecorator/RouterDecorator';
import {
  TranslationDecorator,
} from 'shared/config/storybook/TranslationDecorator/TranslationDecorator';

const preview: Preview = {
  decorators: [
    StyleDecorator,
    ThemeDecorator(Theme.LIGHT),
    RouterDecorator,
    TranslationDecorator,
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
