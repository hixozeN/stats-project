import { StoryFn } from '@storybook/react';
import { StoreProvider, StateSchema } from 'app/providers/StoreProvider/index';
import { DeepPartial } from '@reduxjs/toolkit';
import { ReducerList } from 'shared/hooks/useDynamicReducerLoader/useDynamicReducerLoader';

export const StoreDecorator = (store: DeepPartial<StateSchema>, asyncReducers?: ReducerList) => (Story: StoryFn) => (
  // @ts-ignore
  <StoreProvider initialState={store} asyncReducers={{ ...asyncReducers }}>
    <Story />
  </StoreProvider>
);
