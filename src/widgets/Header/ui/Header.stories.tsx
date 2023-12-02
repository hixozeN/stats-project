import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Header } from './Header';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Header> = {
  title: 'widgets/Header',
  component: Header,
  parameters: {

  },
};

export default meta;

type Story = StoryObj<typeof Header>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const LightNotLoggedIn: Story = {
  args: {},
  decorators: [StoreDecorator({})],
};

export const DarkNotLoggedIn: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})],
};

export const LightLoggedIn: Story = {
  args: {},
  decorators: [StoreDecorator({
    user: {
      isLoggedIn: true,
      authData: { username: 'name' },
    },
  })],
};

export const DarkLoggedIn: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({
    user: {
      isLoggedIn: true,
      authData: { username: 'name' },
    },
  })],
};
