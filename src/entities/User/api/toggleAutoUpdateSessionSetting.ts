import { rtkApi } from 'shared/api/rtkApi';
import { UserSettings } from '../model/types/user';

const toggleAutoUpdateSessionSetting = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    toggleUpdateAutoUpdateSession: build.mutation<
      Pick<UserSettings, 'shouldAutoUpdateSession'>, // response
      Pick<UserSettings, 'shouldAutoUpdateSession'> // body
    >({
      query: (body) => ({
        url: '/user/me/session-auto-update', // замени на реальный URL
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useToggleUpdateAutoUpdateSessionMutation } = toggleAutoUpdateSessionSetting;
