import { configureStore } from '@reduxjs/toolkit';
import userDetail from './userRedux.js';
import teamReducer from './teamSlice.js';

export const store = configureStore({
  reducer: {
    user: userDetail,
    team: teamReducer,
  },
});
