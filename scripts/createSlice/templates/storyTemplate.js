module.exports = (layer, componentName) => `import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import {
  reactRouterParameters,
  reactRouterOutlet,
} from 'storybook-addon-react-router-v6';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { STORYBOOK_STORE } from 'shared/config/storybook/store';
import { ${componentName} } from './${componentName}';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ${componentName}> = {
  title: '${layer}/${componentName}',
  render: () => <${componentName} />,
};

export default meta;

// раскомментировать в случае множественных сторис и типизировать через этот тип
// type Story = StoryObj<typeof ${componentName}>;

export const Template: StoryObj<typeof ${componentName}> = {
  decorators: [
    StoreDecorator(STORYBOOK_STORE),
    ThemeDecorator(Theme.DARK),
  ],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlet({
        path: RoutePath.main,
        element: <${componentName} />,
      }),
    }),
  },
};
`;
