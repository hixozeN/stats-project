import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ThemeButton } from './Button';

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
    children: 'Button',
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Clear: Story = {
  args: {
    ...Default.args,
    theme: ThemeButton.CLEAR,
  },

};

export const Inverted: Story = {
  args: {
    ...Default.args,
    theme: ThemeButton.INVERTED,
  },
  // decorators: [ThemeDecorator(Theme.DARK)],
};

export const Bordered: Story = {
  args: {
    ...Default.args,
    theme: ThemeButton.BORDER,
  },
};

export const BorderInverted: Story = {
  args: {
    ...Default.args,
    theme: ThemeButton.BORDER_INVERTED,
  },
};

export const HighlightedDark: Story = {
  args: {
    ...Default.args,
    theme: ThemeButton.HIGHLIGHT,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
