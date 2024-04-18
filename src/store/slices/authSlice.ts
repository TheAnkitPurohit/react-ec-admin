/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../index';

// Define a type for the slice state
export interface AuthState {
  token: null | string;
  refresh_token: null | string;
}

const authDataString = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;

const auth: AuthState = authDataString ? JSON.parse(authDataString as string) : null;

// Define the initial state using that type
const initialState: AuthState = {
  token: auth?.token ?? null,
  refresh_token: auth?.refresh_token ?? null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: (state) => {
      state.token = null;
      state.refresh_token = null;
    },
    setCredentials: (state, action) => {
      const { token, refresh_token } = action.payload;
      state.token = token;
      state.refresh_token = refresh_token;
    },
  },
});

export const { setCredentials, resetState } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentRefreshToken = (state: RootState) => state.auth.refresh_token;
