import { StoryFn } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (Story: StoryFn) => (
  <div className={`app ${theme}`}>
    <Story />
  </div>
);
