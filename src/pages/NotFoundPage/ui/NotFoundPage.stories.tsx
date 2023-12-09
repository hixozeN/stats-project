import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NotFoundPage } from './NotFoundPage';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof NotFoundPage> = {
  title: 'pages/NotFoundPage',
  component: NotFoundPage,
};

export default meta;

type Story = StoryObj<typeof NotFoundPage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Light: Story = {};
