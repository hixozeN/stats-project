import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Menu } from './Menu';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Menu> = {
  title: 'shared/Menu',
  component: Menu,
};

export default meta;

type Story = StoryObj<typeof Menu>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Light: Story = {
  args: {
    theme: 'navbar',
  },
  decorators: [StoreDecorator({})],
};

export const Dark: Story = {
  args: {
    theme: 'navbar',
  },
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})],
};
