import { configureStore } from '@reduxjs/toolkit';
import userDetail from './userRedux.js';

export const store = configureStore({
  reducer: {
    user: userDetail,
  },
});
