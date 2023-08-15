import type { Meta, StoryObj } from '@storybook/react';
import { Button, ThemeButton } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    ...Default.args,
    theme: ThemeButton.BORDER_INVERTED,
  },
};

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
};

export const Bordered: Story = {
  args: {
    ...Default.args,
    theme: ThemeButton.BORDER,
  },
};
