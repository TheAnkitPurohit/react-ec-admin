/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../index';

// Define a type for the slice state
export interface ProfileState {
  avatar: null | string;
  email: string;
  isMainAdmin: boolean;
  name: string;
}

// Define the initial state using that type
const initialState: ProfileState = {
  avatar: null,
  email: '',
  isMainAdmin: false,
  name: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetState: () => initialState,
    setProfile: (state, action) => {
      const { avatar, email, isMainAdmin, name } = action.payload;
      state.avatar = avatar;
      state.email = email;
      state.isMainAdmin = isMainAdmin;
      state.name = name;
    },
  },
});

export const { setProfile, resetState } = profileSlice.actions;

export default profileSlice.reducer;

export const selectCurrentProfile = (state: RootState) => state.profile;
