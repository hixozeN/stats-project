import type { Meta, StoryObj } from '@storybook/react';
import { AuthInput } from 'features/AuthUser/ui/AuthInput/AuthInput';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/index';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AuthInput> = {
  title: 'features/AuthInput',
  component: AuthInput,
  parameters: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof AuthInput>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Placeholder: Story = {
  args: {
    placeholder: 'Nickname',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Value: Story = {
  args: {
    value: 'Vlados',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
