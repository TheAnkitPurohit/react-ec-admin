import { combineReducers } from '@reduxjs/toolkit'; // defaults to localStorage for web

import authSlice from 'src/store/slices/authSlice';
import profileSlice from 'src/store/slices/profileSlice';

export default combineReducers({
  auth: authSlice,
  profile: profileSlice,
});
