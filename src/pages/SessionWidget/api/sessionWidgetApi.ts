import { rtkApi } from 'shared/api/rtkApi';
import { TUserSession } from 'entities/Lesta';

const sessionWidgetApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getSessionData: build.query<TUserSession, { sessionId: string }>({
      query: ({ sessionId }) => ({
        url: `/sessions/v2/${sessionId}`,
      }),
    }),
    getSessionId: build.query<{ lastSessionId: string }, { accountId: number }>({
      query: ({ accountId }) => ({
        url: `/sessions/last/${accountId}`,
      }),
    }),
  }),
});

export const { useGetSessionDataQuery, useGetSessionIdQuery } = sessionWidgetApi;
