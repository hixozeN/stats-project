import { Provider } from 'react-redux';
import { memo, ReactNode } from 'react';
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { royalApiInterceptors } from 'shared/api/lib/royalApiInterceptors/royalApiInterceptors';
import { useNavigate } from 'layouts';
import { useToasts } from 'shared/hooks/useToasts/useToasts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

interface IStoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = memo(({ children, initialState, asyncReducers }: IStoreProviderProps) => {
  const navigate = useNavigate();
  const { toastSuccess, toastWithError } = useToasts();

  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>,
    navigate,
    toastSuccess,
    toastWithError,
  );

  setupListeners(store.dispatch);

  royalApiInterceptors(store, navigate);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
});
