import type { Preview } from '@storybook/react';
import { StyleDecorator } from 'shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import {
  TranslationDecorator,
} from 'shared/config/storybook/TranslationDecorator/TranslationDecorator';
import { withRouter } from 'storybook-addon-react-router-v6';

const preview: Preview = {
  decorators: [
    StyleDecorator,
    ThemeDecorator(Theme.LIGHT),
    // RouterDecorator, // deprecated decorator, actual - withRouter from 'storybook-addon-react-router-v6' package
    withRouter,
    TranslationDecorator,
  ],
};

export default preview;
