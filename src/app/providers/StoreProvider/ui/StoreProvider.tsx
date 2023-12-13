import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { createReduxStore } from '../config/store';

interface IStoreProviderProps {
  children?: ReactNode;
  initialState?: StateSchema;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export function StoreProvider({ children, initialState, asyncReducers }: IStoreProviderProps) {
  const store = createReduxStore(
    initialState,
    asyncReducers as ReducersMapObject<StateSchema>,
  );

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
