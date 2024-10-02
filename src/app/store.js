import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authenticationSlice';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

export default store;
