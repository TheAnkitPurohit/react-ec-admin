import dayjs from 'dayjs';
import { AxiosResponse } from 'axios';
import queryString from 'query-string';

import client from 'src/lib/client';

const categoryService = {
  create: async (data: any): Promise<any> => {
    const response: AxiosResponse<any> = await client.post('/category/create', data);
    return response?.data;
  },
  list: async (params: CategorySearchFilterInterface): Promise<any> => {
    let createdFrom;
    let createdTo;

    if (params.dateRange) {
      const [first, second] = params.dateRange;
      createdFrom = dayjs(first).format('YYYY-MM-DD');
      createdTo = dayjs(second).format('YYYY-MM-DD');
    }

    const listParams = queryString.stringifyUrl({
      url: '/category',
      query: {
        name: params.name && params.name !== '' ? params.name : undefined,
        enabled: params.enabled.value !== '' ? params.enabled.value : undefined,
        order: params.order ? params.order : undefined,
        createdFrom,
        createdTo,
        page: params?.page,
        limit: params?.paginationPerPage,
      },
    });

    const response: AxiosResponse<any> = await client.get(listParams);
    return response?.data?.data;
  },

  delete: async (id: string): Promise<any> => {
    const response: AxiosResponse<any> = await client.delete(`/category/delete/${id}`);
    return response?.data;
  },
};

export default categoryService;
