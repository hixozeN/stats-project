import { rtkApi } from 'shared/api/rtkApi';
import { Notification } from '../model/types/notification';

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getMyNotifications: build.query<Notification[], null>({
      query: () => ({
        url: '/notifications',
      }),
    }),
    markNotificationAsRead: build.query<string, { id: string }>({
      query: ({ id }) => ({
        url: '/notifications/read',
        method: 'POST',
        body: { id },
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        // optimistic cache update
        const result = dispatch(
          notificationApi.util.updateQueryData('getMyNotifications', null, (notifications: Notification[]) => {
            const notification = notifications.find((n) => n._id === id);

            if (notification) notification.isRead = true;
          }),
        );

        try {
          // waiting mutation
          await queryFulfilled;
        } catch (e) {
          // revert changes on fail
          result.undo();
        }
      },
    }),
  }),
});

export const useNotifications = notificationApi.useGetMyNotificationsQuery;
export const markNotificationAsRead = notificationApi.endpoints.markNotificationAsRead.initiate;
