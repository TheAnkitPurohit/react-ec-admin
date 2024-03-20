import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit'; // defaults to localStorage for web
import { persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import { REDUX_SECRET_KEY } from 'src/utils/environments';

import authSlice from 'src/store/slices/authSlice';

const encryptor = encryptTransform({
  secretKey: REDUX_SECRET_KEY,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'adminQuestionTypeSlice'],
  // blacklist: ["auth"],
  // stateReconciler: hardSet,
  transforms: [encryptor],
};

const rootReducers = combineReducers({
  auth: authSlice,
});

export default persistReducer(persistConfig, rootReducers);
