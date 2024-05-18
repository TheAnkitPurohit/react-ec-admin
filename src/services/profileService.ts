import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

export interface LoginTypes {
  email: string;
  password: string;
}

const profileService = {
  me: async (): Promise<any> => {
    const response: AxiosResponse<any> = await client.get('/profile/me');
    console.log({ response });
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

export default profileService;
