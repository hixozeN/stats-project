import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { UserProfileForm } from 'entities/User/index';
import {
  reactRouterParameters,
  reactRouterOutlet,
} from 'storybook-addon-react-router-v6';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import i18n from 'shared/config/i18n/i18n';
import UserProfilePage from './UserProfilePage';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof UserProfilePage> = {
  title: 'pages/UserProfilePage',
  render: () => <UserProfilePage />,
};

export default meta;

type Story = StoryObj<typeof UserProfilePage>;

export const ProfileEdit: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlet({
        path: RoutePath.profile_edit,
        element: <UserProfileForm />,
      }),
    }),
  },
};

export const Stats: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlet({
        path: RoutePath.profile_stats,
        element: <div>{i18n.t('stats')}</div>,
      }),
    }),
  },
};
