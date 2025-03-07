import { configureStore } from '@reduxjs/toolkit';
import apiUrlReducer from './frontend/store/apiUrl/apiUrlSlice';
import routeUrlReducer from './frontend/store/routeUrl/routeUrlSlice';

export const store = configureStore({
  reducer: {
    apiUrl: apiUrlReducer,
    routeUrl: routeUrlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
