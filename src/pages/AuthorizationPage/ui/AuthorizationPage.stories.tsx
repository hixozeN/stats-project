import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { authReducer } from 'features/AuthUser/index';
import { reactRouterParameters } from 'storybook-addon-react-router-v6';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AuthorizationPage from './AuthorizationPage';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AuthorizationPage> = {
  title: 'pages/AuthorizationPage',
  component: AuthorizationPage,
};

export default meta;

type Story = StoryObj<typeof AuthorizationPage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Dark: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator(
      { authForm: {} },
      { authForm: authReducer },
    ),
  ],
};

export const DarkWithError: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator(
      {
        authForm: {
          email: 'test@test.ru',
          password: 'test_password',
          error: 'Неверные логин или пароль.',
        },
      },
      { authForm: authReducer },
    ),
  ],
};

export const DarkWithLoader: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator(
      {
        authForm: {
          email: 'test@test.ru',
          password: 'test_password',
          isLoading: true,
        },
      },
      { authForm: authReducer },
    ),
  ],
};

export const DarkRegistration: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        state: { tab: 'reg' },
      },
      routing: {
        path: RoutePath.auth,
      },
    }),
  },
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator(
      {
        authForm: {
          nickname: 'ReactDeveloper',
          email: 'test@test.ru',
          password: 'test_password',
        },
      },
      { authForm: authReducer },
    ),
  ],
};

export const Light: Story = {
  decorators: [StoreDecorator({})],
};
