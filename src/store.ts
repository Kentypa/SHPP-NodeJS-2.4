import { configureStore } from '@reduxjs/toolkit';
import apiUrlReducer from './frontend/features/apiUrl/apiUrlSlice';
import routeUrlReducer from './frontend/features/routeUrl/routeUrlSlice';

export const store = configureStore({
  reducer: {
    apiUrl: apiUrlReducer,
    routeUrl: routeUrlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
