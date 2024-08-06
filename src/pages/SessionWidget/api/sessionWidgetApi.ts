import { rtkApi } from 'shared/api/rtkApi';
import { TUserSession } from 'entities/Lesta';

const sessionWidgetApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getSessionData: build.query<TUserSession, { sessionId: string }>({
      query: ({ sessionId }) => ({
        url: `/sessions/v2/${sessionId}`,
      }),
    }),
  }),
});

export const { useGetSessionDataQuery } = sessionWidgetApi;
