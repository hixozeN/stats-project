import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { AppLink, AppLinkTheme } from './AppLink';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AppLink> = {
  title: 'shared/AppLink',
  component: AppLink,
  parameters: {

  },
  args: {
    to: '#',
  },
};

export default meta;

type Story = StoryObj<typeof AppLink>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    theme: AppLinkTheme.PRIMARY,
    children: 'Link',
  },
};

export const PrimaryDark: Story = {
  args: {
    theme: AppLinkTheme.PRIMARY,
    children: 'Link',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Secondary: Story = {
  args: {
    theme: AppLinkTheme.SECONDARY,
    children: 'Link',
  },
};

export const SecondaryDark: Story = {
  args: {
    theme: AppLinkTheme.SECONDARY,
    children: 'Link',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Button: Story = {
  args: {
    theme: AppLinkTheme.BUTTON,
    children: 'Link',
  },
};

export const ButtonDark: Story = {
  args: {
    theme: AppLinkTheme.BUTTON,
    children: 'Link',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

// export const Dark: Story = {
//   args: {},
//   decorators: [ThemeDecorator(Theme.DARK)],
// };
