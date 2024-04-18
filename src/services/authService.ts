import { AxiosResponse } from 'axios';

import client from 'src/lib/client';

export interface LoginTypes {
  email: string;
  password: string;
}

export interface setPasswordTypes {
  password: string;
  token: string;
}

const authService = {
  login: async (data: LoginTypes): Promise<any> => {
    const response: AxiosResponse<any> = await client.post('/auth/login', data);
    return response?.data;
  },

  verifyToken: async (token: string): Promise<any> => {
    const response: AxiosResponse<any> = await client.get(`/auth/verify-token/${token}`);
    return response?.data?.data;
  },

  setPassword: async (data: setPasswordTypes): Promise<any> => {
    const response: AxiosResponse<any> = await client.post('/auth/set-password', data);
    return response?.data;
  },

  forgotPassword: async (email: string): Promise<any> => {
    const response: AxiosResponse<any> = await client.post('/auth/forgot-password', { email });
    return response?.data;
  },
};

export default authService;
