import { StoryFn } from '@storybook/react';
import { StoreProvider, StateSchema } from 'app/providers/StoreProvider/index';
import { DeepPartial } from '@reduxjs/toolkit';

export const StoreDecorator = (store: DeepPartial<StateSchema>) => (Story: StoryFn) => (
// @ts-ignore
  <StoreProvider initialState={store}>
    <Story />
  </StoreProvider>
);
