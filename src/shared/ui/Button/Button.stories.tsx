import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  parameters: {

  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Стандартная кнопка',
  },
};

export const DefaultDark: Story = {
  args: {
    children: 'Стандартная кнопка',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Clear: Story = {
  args: {
    children: 'Прозрачная кнопка',
    theme: 'clear',
  },
};

export const ClearDark: Story = {
  args: {
    children: 'Прозрачная кнопка',
    theme: 'clear',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Danger: Story = {
  args: {
    children: 'Кнопка',
    theme: 'danger',
  },
};

export const DangerDark: Story = {
  args: {
    children: 'Кнопка',
    theme: 'danger',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Inverted: Story = {
  args: {
    children: 'Кнопка',
    theme: 'inverted',
  },
};

export const InvertedDark: Story = {
  args: {
    children: 'Кнопка',
    theme: 'inverted',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Results: Story = {
  args: {
    children: 'Отправить результаты',
    theme: 'send-results',
  },
};

export const ResultsDark: Story = {
  args: {
    children: 'Отправить результаты',
    theme: 'send-results',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const TeamPage: Story = {
  args: {
    children: 'Пригласить игрока',
    variant: 'invite-player',
    theme: 'team',
  },
};

export const TeamPageDark: Story = {
  args: {
    children: 'Пригласить игрока',
    variant: 'invite-player',
    theme: 'team',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const DisbandExtraLarge: Story = {
  args: {
    children: 'Распустить состав',
    variant: 'disband',
    theme: 'danger',
    size: 'size_xxl',
  },
};

export const DisbandExtraLargeDark: Story = {
  args: {
    children: 'Распустить состав',
    variant: 'disband',
    theme: 'danger',
    size: 'size_xxl',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Disabled: Story = {
  args: {
    children: 'Создать',
    variant: 'create',
    theme: 'default',
    disabled: true,
    size: 'size_m',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Loading: Story = {
  args: {
    variant: 'create',
    theme: 'default',
    isLoading: true,
    size: 'size_m',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const NotificationIcon: Story = {
  args: {
    variant: 'notification',
    theme: 'icon',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const ProfileIcon: Story = {
  args: {
    variant: 'send-message',
    theme: 'profile-icon',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
