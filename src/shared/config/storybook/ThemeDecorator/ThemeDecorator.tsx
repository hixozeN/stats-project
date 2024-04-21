import { StoryFn } from '@storybook/react';
import { Theme, ThemeContextProvider } from 'app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (Story: StoryFn) => (
  <ThemeContextProvider initialTheme={theme}>
    <div id="app" className={`app ${theme}`} style={{ minHeight: '100vh' }}>
      <Story />
    </div>
  </ThemeContextProvider>
);
