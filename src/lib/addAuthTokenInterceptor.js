import client from './client';
import { BASE_URL } from '../utils/environments';
import axios from 'axios';

import { resetState, setCredentials } from '../store/slices/authSlice';

let isRefreshTokenUpdating = false;

export default function addAuthTokenInterceptor(store) {
  client.interceptors.request.use((req) => {
    const { token } = store.getState().auth;

    if (!token) return req;
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });

  client.interceptors.response.use(
    (res) => res,
    async (error) => {
      const { token, refresh_token } = store.getState().auth;

      if (!token || !refresh_token) return Promise.reject(error);

      const originalConfig = error?.config;

      console.log({ error });

      if (error.response) {
        if (
          !isRefreshTokenUpdating &&
          refresh_token &&
          error?.response?.status === 401 &&
          !originalConfig._retry
        ) {
          // If user login and have refresh token
          isRefreshTokenUpdating = true;
          originalConfig._retry = true;

          try {
            const data = JSON.stringify({
              refreshTokenAdmin: refresh_token,
            });

            const config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: `${BASE_URL}/auth/generate-token`,
              headers: {
                'Content-Type': 'application/json',
              },
              data,
            };

            const result = await axios.request(config);

            console.log({ result });
            isRefreshTokenUpdating = false;

            const { accessToken, refreshToken } = result?.data?.data;
            store.dispatch(
              setCredentials({
                token: accessToken,
                refresh_token: refreshToken,
              })
            );
            return client(originalConfig);
          } catch (error) {
            console.log({ Token: JSON.stringify(error) });
            isRefreshTokenUpdating = false;
            store.dispatch(resetState());
            window.location.reload();
            return localStorage.removeItem('auth');
          }
        } else if (isRefreshTokenUpdating) {
          await isRefreshTokenDone();
          console.log('isRefreshTokenUpdating');
          return client(originalConfig);
        } else if (token && token.length === 0) {
          console.log('Not token');
          store.dispatch(resetState());
          localStorage.removeItem('auth');
          window.location = '/login';
          return Promise.reject(error?.response?.data);
        } else {
          console.log('reject');
          return Promise.reject(error?.response?.data);
        }
      }
      return Promise.reject(error);
    }
  );
}

/**
 * Stop Function excution still refresh token did't update
 */
const isRefreshTokenDone = async () => {
  if (isRefreshTokenUpdating) {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for one second
    return await isRefreshTokenDone();
  }
  return true;
};