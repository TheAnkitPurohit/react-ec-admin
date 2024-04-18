import { AxiosResponse } from 'axios';
import queryString from 'query-string';

import client from 'src/lib/client';

export interface CreateAdminInterface {
  email: string;
  name: string;
}

const adminService = {
  create: async (data: CreateAdminInterface): Promise<any> => {
    const response: AxiosResponse<any> = await client.post('/admin/create', data);
    return response?.data;
  },

  list: async (params: AdminSearchFilterInterface): Promise<any> => {
    let startDate;
    let endDate;
    if (params.dateRange) {
      const [first, second] = params.dateRange.split('へ').map((part: any) => part.trim());
      startDate = first;
      endDate = second;
    }
    const listParams = queryString.stringifyUrl({
      url: '/admin/list',
      query: {
        name: params.search,
        status: params.status.value,
        startDate,
        endDate,
      },
    });
    const response: AxiosResponse<any> = await client.get(listParams);
    return response?.data?.data;
  },

  delete: async (email: string): Promise<any> => {
    const response: AxiosResponse<any> = await client.put(`/admin/deactive`, { email });
    return response?.data;
  },
};

export default adminService;
