import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import {
  reactRouterOutlet,
  reactRouterParameters,
} from 'storybook-addon-react-router-v6';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Navbar } from 'widgets/Navbar';
import { Header } from './Header';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Header> = {
  title: 'widgets/Header',
  render: () => <Header />,
};

export default meta;

type Story = StoryObj<typeof Header>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const LightNotLoggedIn: Story = {
  decorators: [StoreDecorator({})],
};

export const DarkNotLoggedIn: Story = {
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})],
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

export const LightAuth: Story = {
  decorators: [StoreDecorator({})],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlet({
        path: RoutePath.auth,
        element: <Navbar />,
      }),
    }),
  },
};

export const DarkAuth: Story = {
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlet({
        path: RoutePath.auth,
        element: <Navbar />,
      }),
    }),
  },
};
