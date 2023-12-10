import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Navbar } from './Navbar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Navbar> = {
  title: 'widgets/Navbar',
  render: () => <Navbar />,
};

export default meta;

type Story = StoryObj<typeof Navbar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const LightNotLoggedIn: Story = {
  decorators: [StoreDecorator({})],
};

export const LightLoggedIn: Story = {
  decorators: [
    StoreDecorator({
      user: {
        isLoggedIn: true,
        authData: { username: 'name' },
      },
    }),
  ],
};

export const DarkNotLoggedIn: Story = {
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})],
};

export const DarkLoggedIn: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      user: {
        isLoggedIn: true,
        authData: { username: 'name' },
      },
    }),
  ],
};
