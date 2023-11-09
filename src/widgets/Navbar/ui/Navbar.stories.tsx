import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Navbar } from './Navbar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Navbar> = {
  title: 'widgets/Navbar',
  component: Navbar,
  parameters: {

  },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const LightNotLoggedIn: Story = {
  args: {},
  decorators: [StoreDecorator({})],
};

export const LightLoggedIn: Story = {
  args: {},
  decorators: [StoreDecorator({ user: { isLoggedIn: true } })],
};

export const DarkNotLoggedIn: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})],
};

export const DarkLoggedIn: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({ user: { isLoggedIn: true } })],
};
