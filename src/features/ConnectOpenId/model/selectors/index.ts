import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getOpenIdState = (state: StateSchema) => state?.openId || {
  isInitiated: false,
  isLoading: false,
  error: '',
};

const getOpenIdInit = (state: StateSchema) => state?.openId?.isInitiated || false;
