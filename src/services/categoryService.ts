import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

const categoryService = {
  create: async (data: any): Promise<any> => {
    const response: AxiosResponse<any> = await client.post('/category/create', data);
    return response?.data;
  },
  list: async (params: CategorySearchFilterInterface): Promise<any> => {
    const response: AxiosResponse<any> = await client.get('/category');
    return response?.data?.data;
  },
};

export default categoryService;
