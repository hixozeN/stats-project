import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import AuthorizationPage from './AuthorizationPage';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AuthorizationPage> = {
  title: 'pages/AuthorizationPage',
  component: AuthorizationPage,
  parameters: {

  },
  args: {},
};

export default meta;

type Story = StoryObj<typeof AuthorizationPage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Light: Story = {
  args: {
  },
};

export const Dark: Story = {
  args: {
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
