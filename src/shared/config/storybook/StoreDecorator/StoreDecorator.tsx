import { StoryFn } from '@storybook/react';
import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';
import { ReducerList } from 'shared/hooks/useDynamicReducerLoader/useDynamicReducerLoader';
import { JestStoreProvider } from 'shared/lib/tests/componentRender/JestStoreProvider';

export const StoreDecorator = (store: DeepPartial<StateSchema>, asyncReducers?: ReducerList) => (Story: StoryFn) => (
  // @ts-ignore
  <JestStoreProvider initialState={store} asyncReducers={{ ...asyncReducers }}>
    <Story />
  </JestStoreProvider>
);
