import { rtkApi } from 'shared/api/rtkApi';
import { TMaintenanceData } from '../model/types/index';

const maintenanceApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getMaintenanceData: build.query<TMaintenanceData, null>({
      query: () => ({
        url: '/project/status',
      }),
    }),
  }),
});

export const { useGetMaintenanceDataQuery } = maintenanceApi;
