import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider/index';
import { Reducer } from '@reduxjs/toolkit';

export type ReducerList = {
  // eslint-disable-next-line no-unused-vars
  [name in StateSchemaKey]?: Reducer;
}

type ReducerListEntry = [StateSchemaKey, Reducer];

interface DynamicReducerLoaderArgs {
  reducers: ReducerList;
  removeAfterUnmount?: boolean;
}

export const useDynamicReducerLoader = (args: DynamicReducerLoaderArgs): void => {
  const {
    reducers,
    removeAfterUnmount = true,
  } = args;

  const dispatch = useDispatch();
  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    Object.entries(reducers).forEach(([reducerName, reducer]: ReducerListEntry) => {
      store.reducerManager.add(reducerName, reducer);
      dispatch({ type: `@INIT ${reducerName} reducer` });
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([reducerName]: ReducerListEntry) => {
          store.reducerManager.remove(reducerName);
          dispatch({ type: `@DESTROY ${reducerName} reducer` });
        });
      }
    };
    // eslint-disable-next-line
  }, []);
};
