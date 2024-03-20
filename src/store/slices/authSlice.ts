/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../index";

// Define a type for the slice state
interface AuthState {
  token: null | string;
}

// Define the initial state using that type
const initialState: AuthState = {
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: () => initialState,
    setCredentials: (state, action) => {
      const { access_token: AcessToken } = action.payload;
      state.token = AcessToken;
    },
  },
});

export const { setCredentials, resetState } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
