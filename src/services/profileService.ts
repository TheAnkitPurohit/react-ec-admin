import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

export interface LoginTypes {
  email: string;
  password: string;
}

const authService = {
  me: async (): Promise<any> => {
    const response: AxiosResponse<any> = await client.get('/profile/me');
    return response?.data?.data;
  },

  update: async (data: any): Promise<any> => {
    const response: AxiosResponse<any> = await client.put('/profile/update', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response?.data;
  },

  changePassword: async (data: any): Promise<any> => {
    const response: AxiosResponse<any> = await client.put('/profile/change-password', data);
    return response?.data;
  },
};

export default authService;
