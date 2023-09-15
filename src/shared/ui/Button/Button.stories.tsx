import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ButtonTheme } from './Button';

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
    theme: ButtonTheme.CLEAR,
  },

};

export const Inverted: Story = {
  args: {
    ...Default.args,
    theme: ButtonTheme.INVERTED,
  },
  // decorators: [ThemeDecorator(Theme.DARK)],
};

export const Bordered: Story = {
  args: {
    ...Default.args,
    theme: ButtonTheme.BORDER,
  },
};

export const BorderInverted: Story = {
  args: {
    ...Default.args,
    theme: ButtonTheme.BORDER_INVERTED,
  },
};

export const Background: Story = {
  args: {
    ...Default.args,
    theme: ButtonTheme.BACKGROUND,
  },
};

export const BackgroundInverted: Story = {
  args: {
    ...Default.args,
    theme: ButtonTheme.BACKGROUND_INVERTED,
  },
};

export const HighlightedDark: Story = {
  args: {
    ...Default.args,
    theme: ButtonTheme.HIGHLIGHT,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const SizeM: Story = {
  args: {
    ...Default.args,
    theme: ButtonTheme.BORDER,
    size: ButtonSize.M,
  },
};

export const SizeL: Story = {
  args: {
    ...Default.args,
    theme: ButtonTheme.BORDER,
    size: ButtonSize.L,
  },
};

export const SizeXL: Story = {
  args: {
    ...Default.args,
    theme: ButtonTheme.BORDER,
    size: ButtonSize.XL,
  },
};

export const SquareFixedSizeM: Story = {
  args: {
    ...Default.args,
    children: '>',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.M,
  },
};

export const SquareFixedSizeL: Story = {
  args: {
    ...Default.args,
    children: '>',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.L,
  },
};

export const SquareFixedSizeXL: Story = {
  args: {
    ...Default.args,
    children: '>',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.XL,
  },
};
